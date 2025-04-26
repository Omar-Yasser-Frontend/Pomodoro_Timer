import { useState } from "react";
import { useConfirmation } from "../hooks/useConfirmation";

function ConfirmationForm() {
  const [errors, setErrors] = useState("");
  const [code, setCode] = useState("");
  const { mutate } = useConfirmation();

  return (
    <>
      <div className="bg-white rounded-md p-4 w-[350px] max-w-full text-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            mutate(code);
          }}
          className="signin"
        >
          <p className="text-red-500 text-center">
            Please make sure if you haven't recieved any email that the email
            isn't in spam
          </p>
          <div className=" flex flex-col">
            <label htmlFor="code">Confirmation code</label>
            <input
              type="text"
              value={code}
              onChange={(e) =>
                !isNaN(Number(e.target.value)) && setCode(e.target.value)
              }
              id="code"
              placeholder="******"
              maxLength={6}
              className="bg-gray-200 placeholder:text-gray-400 py-2 px-4 rounded-md outline-none"
            />
            {errors.email && (
              <p className="text-red-600 font-semibold">{errors.email}</p>
            )}
          </div>

          <button className="w-full bg-gray-950 text-white py-2 px-4 mt-6 rounded-md cursor-pointer">
            Verify
          </button>
        </form>
      </div>
    </>
  );
}

export default ConfirmationForm;
