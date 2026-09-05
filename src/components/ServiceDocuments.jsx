import { useRef, useState } from 'react';

import {
  CheckCircle2,
  Upload,
  FileText,
  ChevronDown,
  Paperclip,
  ShieldCheck,
} from 'lucide-react';

import {
  getDocuments,
  addDocument,
} from '../services/documentApi';

import Digilocker from './Digilocker';


export default function ServiceDocuments({
  requiredDocuments = [],
  selectedDocuments = {},
  onChange,
}) {
  const [openDoc, setOpenDoc] = useState(null);

  const [showDigiLocker, setShowDigiLocker] = useState(false);

  const fileInputRefs = useRef({});

  const [documents, setDocuments] = useState(
    getDocuments()
  );


  function refreshDocuments() {
    setDocuments(getDocuments());
  }


  function getMatchingDocuments(requiredDoc) {
    const requiredName = (
      requiredDoc.name || ''
    ).toLowerCase();


    return documents.filter((doc) => {
      const documentName = (
        doc.name ||
        doc.fileName ||
        ''
      ).toLowerCase();


      /*
        First try exact-ish matching.

        Example:
        Required: Aadhaar / ID Proof
        Saved: Aadhaar Card.pdf
      */


      const keywords = requiredName
        .split(/[\s/,&-]+/)
        .filter(
          (word) => word.length >= 4
        );


      return keywords.some(
        (keyword) =>
          documentName.includes(keyword)
      );
    });
  }


  function attachDocument(
    requiredId,
    documentId
  ) {
    onChange({
      ...selectedDocuments,
      [requiredId]: documentId,
    });

    setOpenDoc(null);
  }


  function removeAttachedDocument(
    requiredId
  ) {
    const updated = {
      ...selectedDocuments,
    };

    delete updated[requiredId];

    onChange(updated);
  }


  function handleUpload(
    requiredDoc,
    event
  ) {
    const file =
      event.target.files?.[0];


    if (!file) return;


    const MAX_SIZE =
      2 * 1024 * 1024;


    if (file.size > MAX_SIZE) {
      alert(
        'Please choose a file smaller than 2 MB.'
      );


      event.target.value = '';
      return;
    }


    const reader = new FileReader();


    reader.onload = () => {
      const uploadedDocument =
        addDocument({
          name: file.name,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          dataUrl: reader.result,
        });


      refreshDocuments();


      /*
        Automatically attach the newly
        uploaded document to this requirement.
      */


      onChange({
        ...selectedDocuments,
        [requiredDoc.id]:
          uploadedDocument.id,
      });


      event.target.value = '';
    };


    reader.readAsDataURL(file);
  }


  /*
    DigiLocker selection handler.

    This maps the demo DigiLocker documents
    to the corresponding application
    requirements.
  */

  function handleDigiLockerChange(selectedIds) {
    const updated = {
      ...selectedDocuments,
    };


    selectedIds.forEach((id) => {

      if (id === 'dl-id-proof') {
        const requiredDoc =
          requiredDocuments.find((doc) => {
            const name =
              (doc.name || '').toLowerCase();

            return (
              name.includes('aadhaar') ||
              name.includes('id proof') ||
              name.includes('identity')
            );
          });


        if (requiredDoc) {
          updated[requiredDoc.id] = id;
        }
      }


      if (id === 'dl-address-proof') {
        const requiredDoc =
          requiredDocuments.find((doc) => {
            const name =
              (doc.name || '').toLowerCase();

            return name.includes('address');
          });


        if (requiredDoc) {
          updated[requiredDoc.id] = id;
        }
      }


      if (id === 'dl-income-proof') {
        const requiredDoc =
          requiredDocuments.find((doc) => {
            const name =
              (doc.name || '').toLowerCase();

            return name.includes('income');
          });


        if (requiredDoc) {
          updated[requiredDoc.id] = id;
        }
      }

    });


    onChange(updated);
  }


  if (
    !requiredDocuments ||
    requiredDocuments.length === 0
  ) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Paperclip size={16} />

          No specific documents are required for
          this service.
        </div>
      </div>
    );
  }


  return (
    <div className="rounded-xl border border-gray-200 bg-white">


      {/* HEADER */}

      <div className="p-4 border-b border-gray-100">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="font-heading font-semibold text-navy-900">
              Documents Required
            </h3>


            <p className="text-xs text-gray-500 mt-1">
              Attach your saved documents or upload
              new documents for this application.
            </p>

          </div>


          {/* DIGILOCKER BUTTON */}

          <button
            type="button"
            onClick={() =>
              setShowDigiLocker(
                (current) => !current
              )
            }
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900 transition-colors"
          >

            <ShieldCheck size={16} />

            {showDigiLocker
              ? 'Close DigiLocker'
              : 'Fetch from DigiLocker'}

          </button>

        </div>

      </div>


      {/* DIGILOCKER */}

      {showDigiLocker && (
        <div className="p-4 border-b border-gray-100 bg-gray-50">

          <Digilocker
            selectedDocs={
              Object.values(selectedDocuments)
            }
            onChange={
              handleDigiLockerChange
            }
          />

        </div>
      )}


      {/* REQUIRED DOCUMENTS */}

      <div className="divide-y divide-gray-100">

        {requiredDocuments.map(
          (requiredDoc) => {

            const attachedId =
              selectedDocuments[
                requiredDoc.id
              ];


            const attachedDocument =
              documents.find(
                (doc) =>
                  doc.id === attachedId
              );


            const matchingDocuments =
              getMatchingDocuments(
                requiredDoc
              );


            const isOpen =
              openDoc === requiredDoc.id;


            return (
              <div
                key={requiredDoc.id}
                className="p-4"
              >


                {/* HEADER */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start gap-3">

                    <div className="rounded-lg bg-navy-50 p-2">

                      <FileText
                        size={18}
                        className="text-navy-700"
                      />

                    </div>


                    <div>

                      <p className="text-sm font-semibold text-navy-900">

                        {requiredDoc.name}

                        {requiredDoc.required && (
                          <span className="text-red-500 ml-1">
                            *
                          </span>
                        )}

                      </p>


                      {requiredDoc.description && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {requiredDoc.description}
                        </p>
                      )}

                    </div>

                  </div>


                  {attachedDocument && (
                    <CheckCircle2
                      size={19}
                      className="text-green-600 shrink-0"
                    />
                  )}

                </div>


                {/* ATTACHED */}

                {attachedDocument ? (

                  <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-2 min-w-0">

                        <FileText
                          size={16}
                          className="text-green-700 shrink-0"
                        />

                        <div className="min-w-0">

                          <p className="text-sm font-medium text-green-800 truncate">
                            {attachedDocument.name}
                          </p>

                          <p className="text-xs text-green-600">
                            Attached successfully
                          </p>

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          removeAttachedDocument(
                            requiredDoc.id
                          )
                        }
                        className="text-xs font-semibold text-red-600 hover:underline shrink-0"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="mt-3">


                    {/* SAVED DOCUMENT BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenDoc(
                          isOpen
                            ? null
                            : requiredDoc.id
                        )
                      }
                      className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-gray-50"
                    >

                      <span className="flex items-center gap-2">

                        <Paperclip size={15} />

                        Use Saved Document

                      </span>


                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isOpen
                            ? 'rotate-180'
                            : ''
                        }`}
                      />

                    </button>


                    {/* SAVED DOCUMENT LIST */}

                    {isOpen && (
                      <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-2">

                        {matchingDocuments.length >
                        0 ? (

                          <div className="space-y-1">

                            <p className="text-[11px] text-gray-400 px-2 py-1 uppercase font-semibold">
                              Saved Documents
                            </p>


                            {matchingDocuments.map(
                              (doc) => (

                                <button
                                  key={doc.id}
                                  type="button"
                                  onClick={() =>
                                    attachDocument(
                                      requiredDoc.id,
                                      doc.id
                                    )
                                  }
                                  className="w-full flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-3 py-2.5 text-left hover:border-navy-300 hover:bg-navy-50"
                                >

                                  <FileText
                                    size={16}
                                    className="text-navy-600 shrink-0"
                                  />


                                  <span className="text-sm text-gray-700 truncate">
                                    {doc.name}
                                  </span>

                                </button>

                              )
                            )}

                          </div>

                        ) : (

                          <div className="p-3">

                            <p className="text-xs text-gray-500">

                              No matching saved document
                              found for{' '}

                              <strong>
                                {requiredDoc.name}
                              </strong>.

                            </p>


                            <p className="text-xs text-gray-400 mt-1">

                              Upload it using the button
                              below.

                            </p>

                          </div>

                        )}

                      </div>
                    )}


                    {/* UPLOAD */}

                    <label className="mt-2 cursor-pointer inline-flex items-center gap-2 rounded-lg border border-navy-200 bg-navy-50 text-navy-700 hover:bg-navy-100 px-3 py-2 text-xs font-semibold">

                      <Upload size={14} />

                      Upload New Document


                      <input
                        ref={(element) => {
                          fileInputRefs.current[
                            requiredDoc.id
                          ] = element;
                        }}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                        onChange={(event) =>
                          handleUpload(
                            requiredDoc,
                            event
                          )
                        }
                        className="hidden"
                      />

                    </label>


                  </div>

                )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}