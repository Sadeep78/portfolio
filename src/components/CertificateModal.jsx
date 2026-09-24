import React from 'react';
import { X, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const isImage = certificate.pdfUrl && (certificate.pdfUrl.endsWith('.png') || certificate.pdfUrl.endsWith('.jpg') || certificate.pdfUrl.endsWith('.jpeg'));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '920px', height: '88vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {certificate.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {certificate.issuer}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {certificate.pdfUrl && (
              <a 
                href={certificate.pdfUrl} 
                download={certificate.fileName || `${certificate.title}`}
                className="btn btn-primary btn-sm"
              >
                <Download size={15} />
                <span>{certificate.pdfUrlAlt ? 'Download Stage 2' : 'Download File'}</span>
              </a>
            )}

            {certificate.pdfUrlAlt && (
              <a 
                href={certificate.pdfUrlAlt} 
                download={certificate.fileNameAlt || `${certificate.title}_Stage1`}
                className="btn btn-secondary btn-sm"
              >
                <Download size={15} />
                <span>Download Stage 1</span>
              </a>
            )}

            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: PDF / Image Viewer */}
        <div style={{ flexGrow: 1, backgroundColor: '#070c18', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: isImage ? '1.5rem' : 0 }}>
          {certificate.pdfUrl ? (
            isImage ? (
              <img 
                src={certificate.pdfUrl} 
                alt={certificate.title} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}
              />
            ) : (
              <iframe 
                src={`${certificate.pdfUrl}#toolbar=0&navpanes=0`} 
                title={certificate.title} 
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            )
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Verified Institution Credential</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Credential ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{certificate.credentialId}</span>
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {certificate.verifyUrl && (
          <div style={{ padding: '0.85rem 1.5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Official Verification Code: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{certificate.credentialId}</strong>
            </span>
            <a 
              href={certificate.verifyUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>Verify at open.uom.lk</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
