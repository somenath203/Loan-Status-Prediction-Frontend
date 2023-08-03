'use client';
import Link from "next/link";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-pink-100">

            <p className="text-xl lg:text-3xl text-center font-sans text-pink-600 font-semibold tracking-wide">Welcome to Loan Status Predictor</p>

            <p className="mt-6 text-2xl lg:text-4xl text-center font-sans text-pink-400 font-semibold tracking-wider">Predict whether a person is eligible for loan or not</p>

            <Link href='/loanform'>
                <button className="mt-14 bg-pink-500 py-5 px-8 rounded-lg text-white text-2xl">Get Started</button>
            </Link>

        </div>
    )
};

export default Page;