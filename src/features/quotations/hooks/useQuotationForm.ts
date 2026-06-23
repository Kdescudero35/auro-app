import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  type QuotationClientFormValues,
  quotationClientSchema,
} from '@features/calculators/utils/schemas';
import { useQuotationStore } from '@store/quotationStore';

export function useQuotationForm(): {
  form: ReturnType<typeof useForm<QuotationClientFormValues>>;
  syncToStore: () => void;
} {
  const clientName = useQuotationStore((s) => s.clientName);
  const farmName = useQuotationStore((s) => s.farmName);
  const vendorName = useQuotationStore((s) => s.vendorName);
  const setClientName = useQuotationStore((s) => s.setClientName);
  const setFarmName = useQuotationStore((s) => s.setFarmName);
  const setVendorName = useQuotationStore((s) => s.setVendorName);

  const form = useForm<QuotationClientFormValues>({
    resolver: zodResolver(quotationClientSchema),
    defaultValues: {
      clientName,
      farmName,
      vendorName: vendorName || 'Asesor Aurofarma',
    },
    mode: 'onBlur',
  });

  // Persistir al store en cada cambio de campo (write-through)
  const watched = form.watch();
  useEffect(() => {
    if (watched.clientName !== clientName) setClientName(watched.clientName ?? '');
    if (watched.farmName !== farmName) setFarmName(watched.farmName ?? '');
    if (watched.vendorName !== vendorName) setVendorName(watched.vendorName ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watched.clientName, watched.farmName, watched.vendorName]);

  return {
    form,
    syncToStore: () => {
      const v = form.getValues();
      setClientName(v.clientName);
      setFarmName(v.farmName);
      setVendorName(v.vendorName);
    },
  };
}
