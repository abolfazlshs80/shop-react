// hooks/useChoices.ts (یا هر مسیری که فایل هوک شماست)
import { useEffect, useRef } from 'react';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

export const useChoices = (
  optionsData: Array<{ id: string | number; title: string }> = [],
  config = {},
  defaultValue?: string | number
) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const choicesInstanceRef = useRef<Choices | null>(null);

  // راه‌اندازی اولیه Choices.js
  useEffect(() => {
    if (selectRef.current) {
      choicesInstanceRef.current = new Choices(selectRef.current, {
        searchEnabled: true,
        itemSelectText: '',
        noResultsText: 'نتیجه‌ای یافت نشد',
        noChoicesText: 'گزینه‌ای برای انتخاب نیست',
        placeholder: true,
        ...config,
      });
    }

    return () => {
      choicesInstanceRef.current?.destroy();
      choicesInstanceRef.current = null;
    };
  }, []);

  // هر زمان که گزینه‌ها (optionsData) از API رسیدند، آن‌ها را به Choices تزریق کن
  useEffect(() => {
    if (choicesInstanceRef.current && optionsData.length > 0) {
      const formattedChoices = optionsData.map(item => ({
        value: String(item.id),
        label: item.title,
        selected: String(item.id) === String(defaultValue),
      }));

      choicesInstanceRef.current.setChoices(formattedChoices, 'value', 'label', true);
    }
  }, [optionsData, defaultValue]);

  return selectRef;
};
