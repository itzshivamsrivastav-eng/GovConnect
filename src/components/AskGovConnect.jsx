import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  X,
  Sparkles,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

import { getProfile } from '../services/profileApi';
import { getRankedSchemes } from '../services/schemeApi';
import { getServices } from '../services/serviceApi';
import { useLanguage } from '../context/LanguageContext';

const SCENARIOS = [
  {
    keywords: [
      'business',
      'businessman',
      'entrepreneur',
      'invest',
      'investment',
      'investing',
      'startup',
      'company',
      'enterprise',
      'msme',
      '50 lakh',
      '50lakhs',
      '50 lacs',
      'crore',
    ],
    title: 'Business & Investment',
    schemeCategories: [
      'Small Business',
      'Business',
      'Women Entrepreneurship',
    ],
    serviceCategories: ['Business'],
  },
  {
    keywords: [
      'student',
      'school',
      'college',
      'education',
      'study',
      'studying',
      'scholarship',
      'course',
      'degree',
      'university',
    ],
    title: 'Education & Student Support',
    schemeCategories: [
      'Education',
      'Skill Development',
    ],
    serviceCategories: ['Certificates'],
  },
  {
    keywords: [
      'farmer',
      'farming',
      'farm',
      'agriculture',
      'crop',
      'irrigation',
      'tractor',
      'agricultural',
      'kisan',
      'किसान',
      'खेती',
      'कृषि',
    ],
    title: 'Agriculture & Farmer Support',
    schemeCategories: ['Agriculture'],
    serviceCategories: ['Certificates'],
  },
  {
    keywords: [
      'house',
      'housing',
      'home',
      'home loan',
      'property',
      'build house',
      'buy house',
    ],
    title: 'Housing Support',
    schemeCategories: ['Housing'],
    serviceCategories: ['Certificates'],
  },
  {
    keywords: [
      'solar',
      'solar panel',
      'solar panels',
      'renewable',
      'electricity',
    ],
    title: 'Solar & Energy',
    schemeCategories: [],
    serviceCategories: ['Business'],
  },
  {
    keywords: [
      'passport',
      'travel',
      'abroad',
      'visa',
    ],
    title: 'Travel & Identity Services',
    schemeCategories: [],
    serviceCategories: ['Identity & Travel'],
  },
];

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function detectScenario(text) {
  const query = normalize(text);

  let bestScenario = null;
  let bestScore = 0;

  SCENARIOS.forEach((scenario) => {
    let score = 0;

    scenario.keywords.forEach((keyword) => {
      if (query.includes(normalize(keyword))) {
        score += keyword.length >= 8 ? 2 : 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestScenario = scenario;
    }
  });

  return bestScenario;
}

function getProfileContext(profile) {
  if (!profile) {
    return [];
  }

  const context = [];

  if (profile.state) {
    context.push({
      label: 'State',
      value: profile.state,
    });
  }

  if (profile.occupation) {
    context.push({
      label: 'Occupation',
      value: profile.occupation,
    });
  }

  if (profile.educationLevel) {
    context.push({
      label: 'Education',
      value: profile.educationLevel,
    });
  }

  if (profile.studentStatus) {
    context.push({
      label: 'Student',
      value: profile.studentStatus,
    });
  }

  return context;
}

function getRecommendations(scenario, profile) {
  if (!scenario) {
    return {
      schemes: [],
      services: [],
    };
  }

  const rankedSchemes = getRankedSchemes();

  let schemes = rankedSchemes.filter(
    ({ scheme }) =>
      scenario.schemeCategories.includes(
        scheme.category
      )
  );

  /*
   * For women entrepreneurship, respect
   * the user's stored profile.
   */
  if (
    scenario.schemeCategories.includes(
      'Women Entrepreneurship'
    )
  ) {
    const isFemale =
      normalize(profile?.gender) === 'female';

    if (!isFemale) {
      schemes = schemes.filter(
        ({ scheme }) =>
          scheme.category !==
          'Women Entrepreneurship'
      );
    }
  }

  const services = getServices().filter(
    (service) =>
      scenario.serviceCategories.includes(
        service.category
      )
  );

  return {
    schemes: schemes.slice(0, 3),
    services: services.slice(0, 3),
  };
}

function buildBotResponse(query, profile) {
  const scenario = detectScenario(query);

  if (!scenario) {
    return {
      scenario: null,
      schemes: [],
      services: [],
      profileContext: getProfileContext(profile),
    };
  }

  const recommendations =
    getRecommendations(
      scenario,
      profile
    );

  return {
    scenario,
    ...recommendations,
    profileContext:
      getProfileContext(profile),
  };
}

export default function AskGovConnect() {
  const { language } = useLanguage();

  const isHindi = language === 'hi';

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      type: 'text',
      text: isHindi
        ? 'नमस्ते! 👋 मैं Ask GovConnect हूं। आप अपनी वर्तमान स्थिति बताइए और मैं आपके profile के साथ उसे मिलाकर relevant schemes और services का demo दिखाऊंगा।'
        : 'Hi! 👋 I am Ask GovConnect. Tell me about your current situation and I will combine it with your profile to demonstrate relevant schemes and services.',
    },
  ]);

  const profile = getProfile();

  function sendMessage(customMessage = null) {
    const text = (
      customMessage ?? message
    ).trim();

    if (!text) {
      return;
    }

    const result = buildBotResponse(
      text,
      profile
    );

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      type: 'recommendation',
      response: result,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function resetChat() {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        type: 'text',
        text: isHindi
          ? 'नई query के लिए तैयार हूं! 👋 बताइए आप अभी क्या करना चाहते हैं?'
          : 'I am ready for a new query! 👋 Tell me what you are trying to do right now.',
      },
    ]);

    setMessage('');
  }

  return (
    <>
      {/* FLOATING BUTTON */}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 group"
          aria-label="Open Ask GovConnect"
        >
          <div className="flex items-center gap-2 rounded-full bg-navy-800 hover:bg-navy-900 text-white px-4 py-3 shadow-xl hover:shadow-2xl transition-all duration-200">
            <div className="relative">
              <Bot size={20} />

              <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-green-400 border border-navy-800" />
            </div>

            <span className="text-sm font-semibold">
              Ask GovConnect
            </span>

            <Sparkles
              size={14}
              className="text-amber-300"
            />
          </div>
        </button>
      )}

      {/* CHAT WINDOW */}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[calc(100vh-2rem)] rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
          {/* HEADER */}

          <div className="bg-gradient-to-r from-[#123f82] to-[#157d7a] px-4 py-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Bot size={21} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm">
                      Ask GovConnect
                    </h3>

                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold">
                      Prototype
                    </span>
                  </div>

                  <p className="text-[11px] text-blue-100 mt-0.5">
                    {isHindi
                      ? 'Profile + current situation'
                      : 'Profile + current situation'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}

          <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className={
                  item.sender === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                {item.type === 'text' ? (
                  <div
                    className={
                      item.sender === 'user'
                        ? 'max-w-[82%] rounded-2xl rounded-br-md bg-navy-800 text-white px-4 py-3 text-xs leading-relaxed'
                        : 'max-w-[88%] rounded-2xl rounded-bl-md bg-white border border-gray-200 text-gray-700 px-4 py-3 text-xs leading-relaxed shadow-sm'
                    }
                  >
                    {item.sender === 'bot' && (
                      <div className="flex items-center gap-1.5 mb-2 text-navy-700 font-semibold">
                        <Bot size={13} />
                        <span>
                          Ask GovConnect
                        </span>
                      </div>
                    )}

                    {item.text}
                  </div>
                ) : (
                  <div className="w-[92%]">
                    <div className="rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot
                            size={14}
                            className="text-navy-700"
                          />

                          <p className="text-xs font-semibold text-navy-900">
                            {isHindi
                              ? 'Contextual recommendations'
                              : 'Contextual recommendations'}
                          </p>
                        </div>

                        {item.response.scenario ? (
                          <>
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                              {isHindi
                                ? `आपकी situation को "${item.response.scenario.title}" के रूप में समझा गया है।`
                                : `Your situation was identified as "${item.response.scenario.title}".`}
                            </p>

                            {item.response.profileContext
                              .length > 0 && (
                              <div className="mt-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                                  {isHindi
                                    ? 'Profile context'
                                    : 'Profile context'}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                  {item.response.profileContext.map(
                                    (context) => (
                                      <span
                                        key={`${context.label}-${context.value}`}
                                        className="rounded-full bg-blue-50 border border-blue-100 px-2 py-1 text-[10px] text-blue-800"
                                      >
                                        {context.label}:{' '}
                                        {context.value}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* SCHEMES */}

                            {item.response.schemes
                              .length > 0 && (
                              <div className="mt-4">
                                <p className="text-xs font-semibold text-navy-900 mb-2">
                                  {isHindi
                                    ? 'Relevant Schemes'
                                    : 'Relevant Schemes'}
                                </p>

                                <div className="space-y-2">
                                  {item.response.schemes.map(
                                    ({
                                      scheme,
                                      match,
                                    }) => (
                                      <Link
                                        key={scheme.id}
                                        to={`/schemes/${scheme.id}`}
                                        onClick={() =>
                                          setOpen(false)
                                        }
                                        className="block rounded-xl border border-gray-200 p-3 hover:border-navy-300 hover:bg-gray-50 transition-colors"
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <p className="text-xs font-semibold text-navy-900">
                                            {scheme.name}
                                          </p>

                                          {match && (
                                            <span className="shrink-0 text-[9px] font-semibold text-green-700 bg-green-50 rounded-full px-2 py-1">
                                              {match.percentage}%
                                            </span>
                                          )}
                                        </div>

                                        <p className="text-[10px] text-gray-500 mt-1">
                                          {scheme.category}
                                        </p>

                                        <div className="flex items-center gap-1 mt-2 text-[10px] font-medium text-navy-700">
                                          {isHindi
                                            ? 'View Scheme'
                                            : 'View Scheme'}
                                          <ExternalLink size={10} />
                                        </div>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* SERVICES */}

                            {item.response.services
                              .length > 0 && (
                              <div className="mt-4">
                                <p className="text-xs font-semibold text-navy-900 mb-2">
                                  {isHindi
                                    ? 'Relevant Services'
                                    : 'Relevant Services'}
                                </p>

                                <div className="space-y-2">
                                  {item.response.services.map(
                                    (service) => (
                                      <Link
                                        key={service.id}
                                        to={`/services/${service.id}`}
                                        onClick={() =>
                                          setOpen(false)
                                        }
                                        className="block rounded-xl border border-gray-200 p-3 hover:border-navy-300 hover:bg-gray-50 transition-colors"
                                      >
                                        <p className="text-xs font-semibold text-navy-900">
                                          {service.name}
                                        </p>

                                        <p className="text-[10px] text-gray-500 mt-1">
                                          {service.category}
                                        </p>

                                        <div className="flex items-center gap-1 mt-2 text-[10px] font-medium text-navy-700">
                                          {isHindi
                                            ? 'View Service'
                                            : 'View Service'}
                                          <ExternalLink size={10} />
                                        </div>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {item.response.schemes
                              .length === 0 &&
                              item.response.services
                                .length === 0 && (
                                <p className="mt-3 text-[11px] text-gray-500">
                                  {isHindi
                                    ? 'इस situation के लिए कोई configured demo result नहीं मिला।'
                                    : 'No configured demo result was found for this situation.'}
                                </p>
                              )}
                          </>
                        ) : (
                          <div className="mt-1">
                            <p className="text-[11px] text-gray-600 leading-relaxed">
                              {isHindi
                                ? 'मैं अभी limited prototype scenarios समझ सकता हूं। Business investment, education, farming, housing, solar या passport जैसी कोई situation try करें।'
                                : 'I currently understand a limited set of prototype scenarios. Try a situation involving business investment, education, farming, housing, solar or passport services.'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
                        <p className="text-[9px] text-gray-400 leading-relaxed">
                          {isHindi
                            ? 'Prototype only — final eligibility संबंधित authority द्वारा तय की जाएगी।'
                            : 'Prototype only — final eligibility is determined by the concerned authority.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* INPUT */}

          <div className="border-t border-gray-200 bg-white p-3">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2"
            >
              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                rows={2}
                placeholder={
                  isHindi
                    ? 'अपनी current situation बताएं...'
                    : 'Tell me your current situation...'
                }
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              />

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 rounded-xl bg-navy-800 hover:bg-navy-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-[9px] text-gray-400">
                {isHindi
                  ? 'Profile data + temporary query context'
                  : 'Profile data + temporary query context'}
              </p>

              <button
                type="button"
                onClick={resetChat}
                className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-navy-700 transition-colors"
              >
                <RotateCcw size={10} />
                {isHindi
                  ? 'Reset'
                  : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}