import React, { useEffect,useState } from 'react'
import "./TeacherPaymentSlip.css"
import {useDispatch,useSelector} from "react-redux"
import {fetchSchoolDetails} from "../../../../features/schoolDetailsSlice/schoolDetailSlice"


const PaymentSlip = ({data}) => {

const dispatch = useDispatch();


const {schoolDetails} = useSelector((state)=>state.schoolDetails)





const [schoolData, setSchoolData] = useState({});







    function convertToWords(amount) {
        const words = [
          "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
          "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
          "Seventeen", "Eighteen", "Nineteen"
        ];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const scales = ["", "Thousand", "Million", "Billion"];
      
        if (amount === 0) return "Zero";
      
        const getHundreds = (n) => {
          let word = "";
          if (n > 99) {
            word += words[Math.floor(n / 100)] + " Hundred ";
            n = n % 100;
          }
          if (n > 0 && n < 20) {
            word += words[n] + " ";
          } else if (n >= 20) {
            word += tens[Math.floor(n / 10)] + " ";
            if (n % 10 > 0) word += words[n % 10] + " ";
          }
          return word.trim();
        };
      
        let wordResult = "";
        let scaleIndex = 0;
      
        while (amount > 0) {
          const chunk = amount % 1000;
          if (chunk > 0) {
            wordResult = getHundreds(chunk) + " " + scales[scaleIndex] + " " + wordResult;
          }
          amount = Math.floor(amount / 1000);
          scaleIndex++;
        }
      
        return wordResult.trim();
      }





    const employeeDetails = {
       
        address: "21023 Pearson Point Road, Gate Avenue",
        dateOfJoining: "2018-06-23",
        payPeriod: data && data.month,
        workedDays: 26,
        employeeName: data && data.teacherName,
        designation: "Marketing Executive",
        department: "Marketing",
        earnings: [
          { type: "Basic Pay", amount: 10000 },
          { type: "Incentive Pay", amount: 1000 },
          { type: "House Rent Allowance", amount: 400 },
          { type: "Meal Allowance", amount: 200 },
        ],
        deductions: [
          { type: "Provident Fund", amount: 1200 },
          { type: "Professional Tax", amount: 500 },
          { type: "Loan", amount: 400 },
        ],
        netPay: data && data.totalAmount,
        netPayWords: convertToWords(data.totalAmount),
      };
    
      const totalEarnings = employeeDetails.earnings.reduce((sum, item) => sum + item.amount, 0);
      const totalDeductions = employeeDetails.deductions.reduce((sum, item) => sum + item.amount, 0);


      useEffect(() =>{
        dispatch(fetchSchoolDetails())
      },[])

      useEffect(() => {
        if(schoolDetails){
          setSchoolData(schoolDetails)
        }
      },[schoolDetails])

  return (
    <div>
       <div className="payslip-container">
      <h2>{schoolData.schoolName}</h2>
      <p>{schoolData.schoolAddress}</p>
      <div className="employee-details">

      <p>Transaction Id: {data?._id}</p>
        <p>Pay Period: {data?.month}</p>
        <p>Worked Days: 26</p>
        <p>Employee Name: {data?.teacherName}</p>
    
        
      </div>

      <div className="earnings-section">
        <h3>Earnings</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* {employeeDetails.earnings.map((earning, index) => (
              <tr key={index}>
                <td>{earning.type}</td>
                <td>{earning.amount}</td>
              </tr>
            ))} */}

            <tr>
              <td>Basic pay</td>
              <td>{data?.totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <p>Total Earnings: {data?.totalAmount}</p>
      </div>

      {/* <div className="deductions-section">
        <h3>Deductions</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {employeeDetails.deductions.map((deduction, index) => (
              <tr key={index}>
                <td>{deduction.type}</td>
                <td>{deduction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Deductions: {totalDeductions}</p>
      </div> */}

      <div className="net-pay">
        <h3>Net Pay: {employeeDetails.netPay}</h3>
        <p>In Words: {employeeDetails.netPayWords}</p>
      </div>

      <div className="signature-section">
        <p>Employer Signature __________________</p>
        <p>Employee Signature __________________</p>
      </div>
      <p>This is a system-generated payslip.</p>
    </div>
    </div>
  )
}

export default PaymentSlip
