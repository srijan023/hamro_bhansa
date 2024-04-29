'use client'

import FormElement from "@/components/form/FormElement";
import PrimaryButton from "@/components/form/buttonPrimary";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";

export default function RegisterPage() {

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setFirstPass] = useState('');
  const [confPassword, setLastPass] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // strated creating user
    setCreatingUser(true);
    // required for retrials
    setError(false);
    setUserCreated(false);
    try {

      const res = await fetch('/api/register', {
        method: "POST", body: JSON.stringify({ fullName, email, address, phone, password, confPassword }),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(res);
      if (res.ok === true) {
        setMessage("Created User Successfully");
        setUserCreated(true);
      }
      else {
        setMessage("User creation failed");
        setUserCreated(false);
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
    setCreatingUser(false);
  }

  return (
    <section className="flex w-full mt-4 gap-6">
      <div className="relative w-1/2">
        <Image src={'/signup.jpg'} className="rounded-xl" alt="an orange pattern" objectFit="cover" layout="fill" />
        <div className="text-center text-gray-100 absolute h-full flex justify-center flex-col gap-4 items-center w-full">
          <h1 className="text-5xl">Welcome</h1>
          <p className="text-sm">One stop destination for authentic Nepali cuisine!</p>
        </div>
      </div>
      <div className="my-6 flex flex-col items-center ">
        <h1 className="text-3xl text-gray-500 mb-5">Create an account</h1>
        {(userCreated || error) && (
          <div className={`my-4  ${!error ? "bg-green-300" : "bg-red-200"} text-center py-3 px-5 text-gray-700 rounded-xl`}>
            {message}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 items-center">
          <div className="flex gap-3">
            <FormElement type="text" label="Full Name" placeholder="John Doe" idName="fullName" value={fullName} onChange={ev => setFullName(ev.target.value)} />
            <FormElement type="email" label="Email" placeholder="johndoe@example.com" idName="email" value={email} onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div className="flex gap-3">
            <FormElement type="text" label="Address" idName="address" value={address} onChange={ev => setAddress(ev.target.value)} />
            <FormElement type="text" label="Phone Number" placeholder="(+977)" idName={"phone"} value={phone} onChange={ev => setPhone(ev.target.value)} />
          </div>
          <div className="flex gap-3">
            <FormElement type="password" label="Create Password" idName="createPassword" value={password} onChange={ev => setFirstPass(ev.target.value)} />
            <FormElement type="password" label="Confirm Password" idName="confirmPassword" value={confPassword} onChange={ev => setLastPass(ev.target.value)} />
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
          <div className="flex text-gray-500 justify-center">
            <p className=" w-2/3 text-wrap text-center">By clicking on the above buttons you agree on the terms and conditions of the website</p>
          </div>
        </form>
      </div>
    </section>

  )
}
