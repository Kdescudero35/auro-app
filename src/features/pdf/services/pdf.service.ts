import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import type { QuotationDocument } from '@features/quotations/types';

import { buildQuotationHtml } from '../templates/quotation.template';

/**
 * Servicio de generación y compartición de PDFs.
 *
 * En iOS y Android usa expo-sharing para abrir el share-sheet nativo.
 * En web abre el PDF en una pestaña nueva via dataUrl.
 */
export const pdfService = {
  async generateQuotation(doc: QuotationDocument): Promise<string> {
    const html = buildQuotationHtml(doc);
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });
    return uri;
  },

  async shareQuotation(doc: QuotationDocument): Promise<void> {
    const uri = await this.generateQuotation(doc);

    if (Platform.OS === 'web') {
      // Print API directamente en web
      await Print.printAsync({ html: buildQuotationHtml(doc) });
      return;
    }

    const available = await Sharing.isAvailableAsync();
    if (!available) {
      throw new Error('La compartición no está disponible en este dispositivo');
    }

    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf',
      dialogTitle: 'Compartir cotización',
    });
  },
};
