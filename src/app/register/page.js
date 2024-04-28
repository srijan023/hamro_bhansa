import FormElement from "@/components/form/FormElement";
import PrimaryButton from "@/components/form/buttonPrimary";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa6";

export default function RegisterPage() {
  return (
    <section className="flex w-full mt-4 gap-6">
      <div className="relative w-1/2">
        <Image src={'/signup.jpg'} className="rounded-xl" alt="an orange pattern" objectFit="cover" layout="fill" />
        <div className="text-center text-gray-100 absolute h-full flex justify-center flex-col gap-4 items-center w-full">
          <h1 className="text-5xl">Welcome</h1>
          <p className="text-sm">One stop destination for authentic Nepali cuisine!</p>
        </div>
      </div>
      <div className="my-6">
        <h1 className="text-3xl text-gray-500 mb-5">Create an account</h1>
        <form className="flex flex-col gap-6">
          <div className="flex gap-3">
            <FormElement type="text" label="First Name" placeholder="John" idName="firstName" />
            <FormElement type="text" label="Last Name" placeholder="Doe" idName={"lastName"} />
          </div>
          <div className="flex gap-3">
            <FormElement type="email" label="Email" placeholder="johndoe@example.com" idName="email" />
            <FormElement type="text" label="Address" idName="address" />
          </div>
          <div className="flex gap-3">
            <FormElement type="password" label="Create Password" idName="createPassword" />
            <FormElement type="password" label="Confirm Password" idName="confirmPassword" />
          </div>
          <div className="flex gap-2 text-gray-400">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Accept the terms and conditions</label>
          </div>
          <div className="flex justify-center">
            <PrimaryButton text="Create Account" btnType="submit" />
          </div>
          <div className="text-gray-500 text-center text-sm">
            <p>Or</p>
          </div>
          <div className="flex justify-center">
            <button className="hover:scale-105 px-4 rounded-full py-2 text-gray-500 flex gap-4 items-center border border-gray-400">
              <FaGoogle />
              Sign in with google
            </button>
          </div>
        </form>
      </div>
    </section>

  )
}
