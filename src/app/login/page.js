'use client'

import FormElement from "@/components/form/FormElement"
import PrimaryButton from "@/components/form/buttonPrimary"
import Image from "next/image"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa6"

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const res = await fetch('/api/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok === true) {
      setMessage("Created User Successfully");
      setUserCreated(true);
    } else {
      setMessage(res.statusText);
      setUserCreated(false);
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="flex w-full mt-8 gap-6">
      <div className="relative w-1/2">
        <Image src={'/login.jpg'} className="rounded-xl" alt="an orange pattern" objectFit="cover" layout="fill" />
        <div className="text-center text-gray-100 absolute h-full flex justify-center flex-col gap-4 items-center w-full">
          <h1 className="text-5xl">Welcome Back</h1>
          <p className="text-sm">Nice to see you again!</p>
        </div>
      </div>
      <div className="my-5 w-80 mx-auto">
        <h1 className="text-3xl text-gray-500 mb-5 text-center">Login Account</h1>
        {(userCreated || error) && (
          <div className={`my-4  ${!error ? "bg-green-300" : "bg-red-200"} text-center py-3 text-gray-700 rounded-xl`}>
            {message}
          </div>
        )}
        <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
          <FormElement type="email" label="Email" placeholder="johndoe@example.com" idName="email" disabled={creatingUser} value={email} onChange={ev => setEmail(ev.target.value)} />
          <FormElement type="password" label="Password" idName="password" value={password} disabled={creatingUser} onChange={ev => setPassword(ev.target.value)} />
          <div className="flex gap-2 text-gray-400">
            <input type="checkbox" id="keepSigned" disabled={creatingUser} />
            <label htmlFor="keepSigned">Keep me signed in</label>
          </div>
          <PrimaryButton text="Login" btnType="submit" disabled={creatingUser} />
          <p className="text-center text-gray-500">or</p>
          <div className="flex justify-center">
            <button disabled={creatingUser} className="hover:scale-105 px-4 rounded-full w-full justify-center py-2 disabled:hover:scale-100 text-gray-500 flex gap-4 items-center border border-gray-400">
              <FaGoogle />
              Sign in with google
            </button>
          </div>
        </form>
      </div>
    </section>)
}

