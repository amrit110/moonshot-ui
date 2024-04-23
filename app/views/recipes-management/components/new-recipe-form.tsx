import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { SelectInput, SelectOption } from '@/app/components/selectInput';
import { TextArea } from '@/app/components/textArea';
import { TextInput } from '@/app/components/textInput';
import { useGetAllDatasetQuery } from '@/app/services/dataset-api-service';
import { useGetPromptTemplatesQuery } from '@/app/services/prompt-template-api-service';
import { useGetAllMetricsQuery } from '@/app/services/metric-api-service';
import { useGetAllAttackModulesQuery } from '@/app/services/attack-modules-api-service';
import { TaglabelsBox } from './tag-labels-box';

import { object, string, array } from 'yup';

const initialFormValues: RecipeFormValues = {
  name: '',
  description: '',
  tags: [],
  datasets: [],
  prompt_templates: [],
  metrics: [],
  attack_modules: [],
};

const validationSchema = object().shape({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  datasets: array().min(1, 'At least one dataset is required'),
  metrics: array().min(1, 'At least one metric is required'),
});

type NewRecipeFormProps = {
  className?: string;
  onFormSubmit: (data: RecipeFormValues) => void;
};

const NewRecipeForm: React.FC<NewRecipeFormProps> = (props) => {
  const { className, onFormSubmit } = props;
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const submitEnabled = formik.isValid;

  async function handleFormSubmit(values: RecipeFormValues) {
    if (onFormSubmit) onFormSubmit(values);
  }

  //  Getting Dataset Options
  const [datasetOption, setDatasetOptions] = useState<SelectOption[]>([]);
  const { data: datasetData, isLoading: datasetIsLoading, error: datasetError, refetch: datasetRefetch } = useGetAllDatasetQuery();

  useEffect(() => {
    if (datasetData) {
      const options: SelectOption[] = datasetData.map((dataset) => ({
        value: dataset.id,
        label: dataset.name,
      }));
      setDatasetOptions(options);
    }
  }, [datasetData]);

  // Getting Prompt Template Options
  const [promptTemplateOptions, setPromptTemplateOptions] = useState<SelectOption[]>([]);
  const { data: promptTemplateData, isLoading: promptTemplateIsLoading, error: promptTemplateError, refetch: promptTemplateRefetch } = useGetPromptTemplatesQuery();

  useEffect(() => {
    if (promptTemplateData) {
      const options: SelectOption[] = promptTemplateData.map((promptTemplate) => ({
        value: promptTemplate.name,
        label: promptTemplate.name,
      }));
      setPromptTemplateOptions(options);
    }
  }, [promptTemplateData]);

  // Getting Metric Options
  const [metricOptions, setMetricOptions] = useState<SelectOption[]>([]);
  const { data: metricData, isLoading: metricIsLoading, error: metricError, refetch: metricRefetch } = useGetAllMetricsQuery();

  useEffect(() => {
    if (metricData) {
      const options: SelectOption[] = metricData.map((metric) => ({
        value: metric,
        label: metric,
      }));
      setMetricOptions(options);
    }
  }, [metricData]);

  // Getting Attack Strategy Options
  const [attackModulesOptions, setAttackModulesOptions] = useState<SelectOption[]>([]);
  const { data: attackModulesData, isLoading: attackModuleIsLoading, error: attackModuleError, refetch: attackModuleReFetch } = useGetAllAttackModulesQuery();

  useEffect(() => {
    if (attackModulesData) {
      const options: SelectOption[] = attackModulesData.map((attackModule) => ({
        value: attackModule,
        label: attackModule,
      }));
      setAttackModulesOptions(options);
    }
  }, [attackModulesData]);

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (currentTag.trim() !== '') {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag('');
        formik.setFieldValue('tags', [...tags, currentTag.trim()]); 
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value);
    formik.handleChange(event);
  };

  const handleTagRemove = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    formik.setFieldValue('tags', updatedTags);
  };

  return (
    <div className="p-4 w-96 h-full">
      <TextInput
        name="name"
        label="Name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={
          formik.touched.name && formik.errors.name
            ? formik.errors.name
            : undefined
        }
        placeholder=""
      />

      <TextInput
        name="Tags"
        label="Tags"
        onChange={handleChange}
        onKeyDown={handleKeyDown} 
        onBlur={formik.handleBlur}
        placeholder="Type a tag and press Enter"
        error={
          formik.touched.tags && formik.errors.tags
            ? formik.errors.tags
            : undefined
        }
      />
      <TaglabelsBox tags={tags} onTagRemove={handleTagRemove} />
      <TextArea
        name="description"
        label="Description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={
          formik.touched.description && formik.errors.description
            ? formik.errors.description
            : undefined
        }
        placeholder=""
      />

      <SelectInput
        label="Datasets"
        name="datasets"
        options={datasetOption}
        onSyntheticChange={formik.handleChange}
        value={formik.values.datasets}
        isMulti={true}
      />

      <SelectInput
        label="Prompt Templates"
        name="prompt_templates"
        options={promptTemplateOptions}
        onSyntheticChange={formik.handleChange}
        value={formik.values.prompt_templates}
        isMulti={true}
      />

      <SelectInput
        label="Metrics"
        name="metrics"
        options={metricOptions}
        onSyntheticChange={formik.handleChange}
        value={formik.values.metrics}
        isMulti={true}
      />

      <SelectInput
        label="Attack Modules"
        name="attack_modules"
        options={attackModulesOptions}
        onSyntheticChange={formik.handleChange}
        value={formik.values.attack_modules}
        isMulti={true}
      />

      <div className="bottom-3 text-right">
        <button
          disabled={!submitEnabled}
          className="flex btn-primary items-center gap-2 btn-large rounded"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Create Recipe
        </button>
      </div>
    </div>
  );
};

export { NewRecipeForm };
