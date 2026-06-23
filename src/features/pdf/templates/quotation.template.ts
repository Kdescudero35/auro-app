import type { QuotationDocument } from '@features/quotations/types';
import { formatCurrency, formatNumber } from '@utils/format';

export function buildQuotationHtml(doc: QuotationDocument): string {
  const rows = doc.items
    .map((item, idx) => {
      const subtotal = item.cantidadRequerida * item.precioUnitario;
      return `
        <tr class="${idx % 2 === 0 ? 'even' : ''}">
          <td>
            <div class="product-name">${esc(item.producto)}</div>
            <div class="product-meta">${esc(item.principioActivo ?? '')}</div>
            <div class="product-tags">
              <span class="tag">${esc(item.formaAdministracion ?? '')}</span>
              <span class="tag">${esc(item.especialidad)}</span>
            </div>
          </td>
          <td class="center">${formatNumber(item.cantidadRequerida)} ${item.cantidadUnidad}</td>
          <td class="center">${esc(item.presentacion)}</td>
          <td class="right">${formatCurrency(item.precioUnitario)}</td>
          <td class="right strong">${formatCurrency(subtotal)}</td>
        </tr>
        <tr class="retiro-row">
          <td colspan="5">
            <span class="retiro-label">Tiempo de retiro:</span> ${esc(item.tiempoRetiro ?? 'No especificado')}
          </td>
        </tr>
      `;
    })
    .join('');

  const subtotals = doc.items.map((i) => i.cantidadRequerida * i.precioUnitario);
  const grandTotal = subtotals.reduce((a, b) => a + b, 0);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Cotización ${esc(doc.clientName)}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          color: #1E293B;
          font-size: 11px;
          line-height: 1.5;
          padding: 28px 32px;
          background: #fff;
        }

        .header {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          color: #fff;
          padding: 22px 28px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }
        .brand { display: flex; align-items: center; gap: 14px; }
        .brand-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .brand-name { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .brand-sub { font-size: 10px; opacity: 0.85; margin-top: 2px; }
        .header-right { text-align: right; }
        .doc-label { font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; opacity: 0.8; }
        .doc-date { font-size: 14px; font-weight: 700; margin-top: 2px; }

        .section { margin-bottom: 20px; }
        .section-title {
          font-size: 10px; font-weight: 700; letter-spacing: 1.4px;
          text-transform: uppercase; color: #64748B;
          padding-bottom: 6px; border-bottom: 2px solid #E2E8F0;
          margin-bottom: 14px;
        }

        .client-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;
          background: #F8FAFC; border-radius: 8px; padding: 16px;
        }
        .client-item .label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; color: #94A3B8;
        }
        .client-item .value {
          font-size: 13px; font-weight: 700; color: #0F172A; margin-top: 3px;
        }

        table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
        thead th {
          background: #F1F5F9; color: #475569;
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 10px 10px;
          text-align: left; border-bottom: 2px solid #16A34A;
        }
        tbody td {
          padding: 10px 10px; border-bottom: 1px solid #F1F5F9;
          vertical-align: top; font-size: 11px;
        }
        .even td { background: #FAFBFC; }
        .center { text-align: center; }
        .right { text-align: right; }
        .strong { font-weight: 800; }

        .product-name { font-weight: 800; font-size: 12px; color: #0F172A; }
        .product-meta { font-size: 10px; color: #64748B; margin-top: 2px; }
        .product-tags { display: flex; gap: 6px; margin-top: 4px; }
        .tag {
          font-size: 9px; font-weight: 600; color: #16A34A;
          background: #DCFCE7; padding: 2px 8px; border-radius: 4px;
        }

        .retiro-row td {
          padding: 4px 10px 10px 10px; border-bottom: 1px solid #E2E8F0;
          font-size: 10px; color: #DC2626;
        }
        .retiro-label { font-weight: 700; color: #991B1B; }

        .total-bar {
          background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
          color: #fff; padding: 16px 24px; border-radius: 10px;
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 8px;
        }
        .total-bar .label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
        }
        .total-bar .value { font-size: 24px; font-weight: 800; }

        .footer {
          margin-top: 32px; border-top: 1px solid #E2E8F0;
          padding-top: 12px; color: #94A3B8; font-size: 9px;
          display: flex; justify-content: space-between;
        }

        .summary-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
          margin-bottom: 20px;
        }
        .summary-card {
          background: #F8FAFC; border-radius: 8px; padding: 12px 14px;
          text-align: center; border: 1px solid #E2E8F0;
        }
        .summary-card .label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; color: #64748B;
        }
        .summary-card .value {
          font-size: 18px; font-weight: 800; color: #16A34A; margin-top: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <div class="brand-icon">🧬</div>
          <div>
            <div class="brand-name">AuroApp</div>
            <div class="brand-sub">Aurofarma · Soluciones Pecuarias</div>
          </div>
        </div>
        <div class="header-right">
          <div class="doc-label">Cotización pecuaria</div>
          <div class="doc-date">${esc(doc.date)}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Datos del cliente</div>
        <div class="client-grid">
          <div class="client-item">
            <div class="label">Cliente</div>
            <div class="value">${esc(doc.clientName) || '—'}</div>
          </div>
          <div class="client-item">
            <div class="label">Finca / Granja</div>
            <div class="value">${esc(doc.farmName) || '—'}</div>
          </div>
          <div class="client-item">
            <div class="label">Vendedor Asesor</div>
            <div class="value">${esc(doc.vendorName) || '—'}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Resumen</div>
        <div class="summary-grid">
          <div class="summary-card">
            <div class="label">Productos</div>
            <div class="value">${doc.items.length}</div>
          </div>
          <div class="summary-card">
            <div class="label">Especialidades</div>
            <div class="value">${new Set(doc.items.map((i) => i.especialidad)).size}</div>
          </div>
          <div class="summary-card">
            <div class="label">Total Cotizado</div>
            <div class="value">${formatCurrency(grandTotal)}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Detalle de productos</div>
        <table>
          <thead>
            <tr>
              <th style="width:38%">Producto</th>
              <th class="center" style="width:14%">Cantidad</th>
              <th class="center" style="width:14%">Presentación</th>
              <th class="right" style="width:16%">Precio Unit.</th>
              <th class="right" style="width:18%">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94A3B8;">Sin productos</td></tr>'}
          </tbody>
        </table>

        <div class="total-bar">
          <div class="label">Total Cotizado</div>
          <div class="value">${formatCurrency(grandTotal)}</div>
        </div>
      </div>

      <div class="footer">
        <span>Generado por AuroApp · Aurofarma · ${esc(doc.date)}</span>
        <span>Este documento es una propuesta comercial sin valor fiscal.</span>
      </div>
    </body>
    </html>
  `;
}

const esc = (str: string): string =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
