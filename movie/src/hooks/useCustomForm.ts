import { useEffect, useState } from "react";

// Props 타입 정의
type UseFormProps<T> = {
  initialValue: T; // 초기 값의 타입
  validate: (values: T) => Partial<Record<keyof T, string>>; // 유효성 검사 함수의 타입
};

// 반환 타입 정의
type UseFormReturn<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  getTextInputProps: (name: keyof T) => {
    value: T[keyof T];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
};

function useForm<T extends Record<string, any>>({
  initialValue,
  validate,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  // 입력값 변경 처리
  const handleChangeInput = (name: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 입력 필드 포커스 해제 처리
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 텍스트 입력 필드 Props 생성
  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeInput(name, event.target.value as T[keyof T]);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // 유효성 검사
  useEffect(() => {
    const newErrors = validate(values);
    console.log(newErrors);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getTextInputProps };
}

export default useForm;
