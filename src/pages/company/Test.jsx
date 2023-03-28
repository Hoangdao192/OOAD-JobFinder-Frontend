import { data } from "components/company/Chart";
import { useFieldArray, useForm } from "react-hook-form";

const { default: SelectionList } = require("components/company/SelectionList");
const { default: React, useState } = require("react");

export default function Test() {
  const majorList = ["Information Technology", "Sale", "Accountant", "Medical"];

  const [selectedMajor, setSelectedMajor] = useState("");

  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("major", selectedMajor);
    for (const value of formData.values()) {
      console.log(value);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="major">Major</label>
      <SelectionList
        options={majorList}
        selected={selectedMajor}
        setSelected={setSelectedMajor}
      />
      <input type="submit" className="bg-blue-500 text-white p-2 mt-5" />
    </form>
  );
}
