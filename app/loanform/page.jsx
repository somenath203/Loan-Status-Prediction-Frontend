'use client';

import { Form, message } from "antd";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Spinner from "@/components/Spinner";


const MySwal = withReactContent(Swal);


const Page = () => {

    const [fullName, setFullName] = useState();
    let [gender, setGender] = useState();
    let [graduate, setGraduate] = useState();
    const [noOfDependent, setNoOfDependent] = useState();
    let [maritalStatus, setMaritalStatus] = useState();
    let [livingArea, setLivingArea] = useState();
    let [employmnent, setEmployment] = useState();
    const [incomeOfApplicant, setIncomeOfApplicant] = useState();
    let [incomeOfCoApplicant, setIncomeOfCoApplicant] = useState();
    const [loanAmount, setLoanAmount] = useState();
    const [loanAmountTerm, setLoanAmoutnTerm] = useState();
    let [creditHistory, setCreditHistory] = useState();

    const [loading, setLoading] = useState();


    const onSubmitForm = async (e) => {

        e.preventDefault();

        if (!(fullName && noOfDependent && incomeOfApplicant && loanAmount && loanAmountTerm)) {

            message.error('please fill all the input fields');

        } else {

            gender = gender ? gender : 1;
            graduate = graduate ? graduate : 1;
            maritalStatus = maritalStatus ? maritalStatus : 1;
            livingArea = livingArea ? livingArea : 0;
            employmnent = employmnent ? employmnent : 1;
            incomeOfCoApplicant = incomeOfCoApplicant ? incomeOfApplicant : 0;
            creditHistory = creditHistory ? creditHistory : 1.0;

            const noOfDependentNo = Number(noOfDependent);
            const incomeOfApplicantNo = Number(incomeOfApplicant);
            const loanAmountNo = Number(loanAmount);
            const loanAmountTermNo = Number(loanAmountTerm);
            const genderNo = Number(gender);
            const graduateNo = Number(graduate);
            const maritalStatusNo = Number(maritalStatus);
            const livingAreaNo = Number(livingArea);
            const employmentNo = Number(employmnent);
            const incomeOfCoApplicantNo = Number(incomeOfCoApplicant);
            const creditHistoryNo = Number(creditHistory);


            try {

                setLoading(true);

                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict-loan-status`, {
                    genderNo: genderNo,
                    marriedNo: maritalStatusNo,
                    dependentsNo: noOfDependentNo,
                    educationNo: graduateNo,
                    selfEmployedNo: employmentNo,
                    applicantIncomeNo: incomeOfApplicantNo,
                    coApplicantIncomeNo: incomeOfCoApplicantNo,
                    loanAmountNo: loanAmountNo,
                    loanAmountTermNo: loanAmountTermNo,
                    creditHistoryNo: creditHistoryNo,
                    propertyAreaNo: livingAreaNo
                });

                setLoading(false);

                if (data.pred_message === 0) {

                    MySwal.fire({
                        title: `Dear ${fullName}, you are not eligible for loan.`,
                        icon: 'error'
                    });

                } else {

                    MySwal.fire({
                        title: `Dear ${fullName}, you are eligible for loan.`,
                        icon: 'success'
                    });

                }

            } catch (error) {

                setLoading(false);

                console.log(error);

                message.error('Something went Wrong. Please try Again');

            }



        }
    }


    return (
        <>

            {loading && <Spinner />}

            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-pink-100">

                <p className="text-2xl lg:text-3xl mt-12 mb-10 text-center font-sans text-pink-600 font-semibold tracking-wide">Applicant Details Form</p>

                <div className="mt-6 w-11/12 lg:w-3/5">

                    <Form layout="vertical" onSubmitCapture={onSubmitForm}>

                        <Form.Item label='Fullname of the Applicant' name='fullname'>
                            <input type="text" placeholder="enter the fullname of the applicant" className="w-full py-2 pl-2 rounded-lg shadow-md" onChange={(e) => setFullName(e.target.value)} />
                        </Form.Item>


                        <Form.Item label='Select the Gender of the Applicant' name='gender'>
                            <select
                                className='py-2 pl-2 rounded-lg shadow-md w-full'
                                onClick={(e) => setGender(e.target.value)}
                            >
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </Form.Item>

                        <Form.Item label='Is applicant Graduated?' name='graduated'>
                            <select
                                className='py-2 pl-2 rounded-lg shadow-md w-full'
                                onClick={(e) => setGraduate(e.target.value)}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </Form.Item>


                        <Form.Item label='No of Dependents on the Applicant' name='noofdependent'>
                            <input type="number" placeholder="how many persons are dependent on the applicant" min='0' className="w-full py-2 pl-2 rounded-lg shadow-md" onChange={(e) => setNoOfDependent(e.target.value)} />
                        </Form.Item>


                        <Form.Item label='Select the Marital Status of the Applicant' name='martialstatus'>
                            <select
                                className='w-full py-2 pl-2 rounded-lg shadow-md'
                                onClick={(e) => setMaritalStatus(e.target.value)}
                            >
                                <option value="1">Married</option>
                                <option value="0">Not Married</option>
                            </select>
                        </Form.Item>

                        <Form.Item label='In which type of area the applicant lives?' name='livingarea'>
                            <select
                                className='w-full py-2 pl-2 rounded-lg shadow-md'
                                onClick={(e) => setLivingArea(e.target.value)}
                            >
                                <option value="0">Rural</option>
                                <option value="2">Semi Urban</option>
                                <option value="1">Urban</option>
                            </select>
                        </Form.Item>


                        <Form.Item label='Is the applicant Self Employed?' name='employement'>
                            <select
                                className='w-full py-2 pl-2 rounded-lg shadow-md'
                                onClick={(e) => setEmployment(e.target.value)}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </Form.Item>

                        <Form.Item label='Total Income of the Applicant' name='totalapplicant'>
                            <input type="number" placeholder="enter the total income of the applicant" min='0' className="shadow-md w-full py-2 pl-2 rounded-lg" onChange={(e) => setIncomeOfApplicant(e.target.value)} />
                        </Form.Item>

                        <Form.Item label='Total Income of Family Member of the Applicant(OPTIONAL)' name='totalincomecoapplicant'>
                            <input type="number" placeholder="enter the total income of any of your family member" min='0' className="w-full py-2 pl-2 rounded-lg shadow-md" onChange={(e) => setIncomeOfCoApplicant(e.target.value)} />
                        </Form.Item>


                        <Form.Item label='Total Loan Amount' name='totalloanamount'>
                            <input type="number" placeholder="enter the total income of any of your family member" min='0' className="w-full py-2 pl-2 rounded-lg shadow-md" onChange={(e) => setLoanAmount(e.target.value)} />
                        </Form.Item>

                        <Form.Item label='Loan Amount Term' name='totalloanamountterm'>
                            <input type="number" placeholder="for how many days applicant wants the loan" min='0' className="w-full py-2 pl-2 rounded-lg shadow-md" onChange={(e) => setLoanAmoutnTerm(e.target.value)} />
                        </Form.Item>


                        <Form.Item label='Is the credit history of the applicant Ok?' name='credithistory'>
                            <select
                                className='w-full py-2 pl-2 rounded-lg shadow-md'
                                onClick={(e) => setCreditHistory(e.target.value)}
                            >
                                <option value="1.0">Yes</option>
                                <option value="0.0">No</option>
                            </select>
                        </Form.Item>

                        <button className="mt-12 tracking-widest mb-10 block bg-pink-500 py-2 px-4 rounded-md text-white text-2xl w-full m-auto">PREDICT</button>

                    </Form>

                </div>

            </div>

        </>
    )
};

export default Page;