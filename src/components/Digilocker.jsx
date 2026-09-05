import { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function Digilocker({
  selectedDocs = [],
  onChange,
}) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  function connectDigiLocker() {
    setLoading(true);

    // Demo DigiLocker connection
    setTimeout(() => {
      setDocuments([
        {
          id: 'dl-id-proof',
          name: 'Identity Proof',
          fileName: 'Identity_Proof.pdf',
        },
        {
          id: 'dl-address-proof',
          name: 'Address Proof',
          fileName: 'Address_Proof.pdf',
        },
        {
          id: 'dl-income-proof',
          name: 'Income Certificate',
          fileName: 'Income_Certificate.pdf',
        },
      ]);

      setConnected(true);
      setLoading(false);
    }, 800);
  }

  function toggleDocument(documentId) {
    if (selectedDocs.includes(documentId)) {
      onChange(
        selectedDocs.filter((id) => id !== documentId)
      );
    } else {
      onChange([
        ...selectedDocs,
        documentId,
      ]);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <ShieldCheck
              size={20}
              className="text-blue-700"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-navy-900">
              Fetch Documents from DigiLocker
            </h4>

            <p className="text-xs text-gray-500 mt-1">
              Securely fetch documents from your DigiLocker
              account for this application.
            </p>
          </div>
        </div>

        {!connected && (
          <button
            type="button"
            onClick={connectDigiLocker}
            disabled={loading}
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white px-3 py-2 text-xs font-semibold"
          >
            {loading ? (
              <>
                <RefreshCw
                  size={14}
                  className="animate-spin"
                />
                Connecting...
              </>
            ) : (
              <>
                <ShieldCheck size={14} />
                Fetch from DigiLocker
              </>
            )}
          </button>
        )}
      </div>

      {/* Connected state */}
      {connected && (
        <div className="p-4">
          
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />

            <p className="text-xs font-semibold text-green-700">
              DigiLocker connected successfully
            </p>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Select the documents you want to attach to this
            application.
          </p>

          <div className="space-y-2">
            {documents.map((doc) => {
              const selected =
                selectedDocs.includes(doc.id);

              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() =>
                    toggleDocument(doc.id)
                  }
                  className={`w-full flex items-center justify-between gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                    selected
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-navy-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="rounded-md bg-white border border-gray-200 p-2 shrink-0">
                      <FileText
                        size={16}
                        className="text-navy-700"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">
                        {doc.name}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {doc.fileName}
                      </p>
                    </div>
                  </div>

                  {selected && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 shrink-0">
                      <CheckCircle2 size={15} />
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
            <p className="text-[11px] leading-5 text-blue-800">
              Demo integration: documents are fetched from a
              simulated DigiLocker connection. GovConnect does
              not permanently store these documents.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}