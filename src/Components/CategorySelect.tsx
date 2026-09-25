import React, { useState, useEffect } from 'react';
import { useChoices } from '../Hooks/useChoices'; // مسیر هوک
import type { GetSelectListCategoryResponse } from '../Service/api/Categories/category.types';
import { CategoryService } from '../Service/api/Categories/category.service';
import { handleApiError } from '../Service/api/handleApiError';
import alertService from '../Hooks/alertService';

interface Props {
  selectedCategoryId?: number | string; // مقدار پیش‌فرض (برای حالت ویرایش)
  onChange: (id: string) => void;
}

export const CategorySelect: React.FC<Props> = ({ selectedCategoryId, onChange }) => {
  const [options, setOptions] = useState<GetSelectListCategoryResponse[]>([]);

  // پاس دادن options و selectedCategoryId به هوک
  const selectRef = useChoices(options, {
    placeholderValue: 'انتخاب دسته‌بندی...',
  }, selectedCategoryId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const service = new CategoryService();
        const data = await service.getSelectList();
        setOptions(data?.data?.list ?? []);
      } catch (error) {
        const message = handleApiError(error);
        alertService.error(message);
        console.error("Failed to fetch categories:", message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <select 
      ref={selectRef} 
      onChange={(e) => onChange(e.target.value)}
    >
      {/* نیازی به map کردن دستی optionها نیست، چون choices.setChoices خودش پر می‌کند */}
    </select>
  );
};

export default CategorySelect;
