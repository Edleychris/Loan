import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { LoanOverHeader } from "./LoanOverHeader";
import css from './loanoverview.module.css';
import {LoanGeneralInfo} from './LoanGeneralInfo';
import { LoanLoanDetails } from "./LoanLoanDetails";
import { LoanRiskScore } from "./LoanRiskScore";
import { LoanDocument } from "./LoanDocument";

const OVERINPUT = {
  firstname: "",
  middlename: "",
  lastname: "",
  sex: "",
  dob: "",
  marital: "",
  email: "",
  phone: "",
  nin: "",
  address: "",
  tenancy: "",
  placeholder: "",
  placework: "",
  jobtitle: "",
  workmail: "",
  staffnum: "",
  startdate: "",
  enddate: "",
  companyadd: "",
  fullname: "",
  empstatus: "",
  guarantmail: "",
  guarantnum: "",
  guarantdob: "",
  guarantnin: "",
  guarantwork: "",
  guaworkadd: "",
};

export const LoanOverview = () => {
  const [overinput, setOverInput] = useState(OVERINPUT);
  const [activeTab, setActiveTab] = useState("allLoans");
      
        const handleTabClick = (tab) => {
          setActiveTab(tab);
        };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOverInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log({ id, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${info.firstname} ${info.lastname} ${info.email}`);
    setOverInput(INFOINPUT);
    console.log("submitted");
  };

  return (
      <div>
        <div className={css.overviewInfoNav}>
          <Link to="/dashboard">Home</Link>
          <BiChevronRight className={css.icon} />
          <Link to="/clients">All Clients</Link>
          <BiChevronRight className={css.icon} />
          <Link to="#">Clients Overview</Link>
          <BiChevronRight className={css.icon} />
          <Link to="#">General Information</Link>
        </div>

        <div className={css.topBar}>
        <LoanOverHeader/>
        <div className={css.BorrowerInfo}>
        <div className={css.overview_tab_container}>
      <div className={css.overview_tab_header}>
        <div className={css.overview_tab_tabs}>
          <div
            className={`${css.overview_tab_tab} ${activeTab === "allLoans" ? css.active : ""}`}
            onClick={() => handleTabClick("allLoans")}
          >
           General Information
          </div>
          <div
            className={`${css.overview_tab_tab} ${activeTab === "newApp" ? css.active : ""}`}
            onClick={() => handleTabClick("newApp")}
          >
           Loan Application
          </div>
          <div
            className={`${css.overview_tab_tab} ${activeTab === "pending" ? css.active : ""}`}
            onClick={() => handleTabClick("pending")}
          >
            Risk Score
          </div>
          <div
            className={`${css.overview_tab_tab} ${activeTab === "active" ? css.active : ""}`}
            onClick={() => handleTabClick("active")}
          >
            Documents
          </div>
        </div>
      </div>
    </div>
  

    <div>
        {activeTab === "allLoans" && <div className={css.client_tab_content}>
        <LoanGeneralInfo/>
        </div>}
        {activeTab === "newApp" && <div className={css.client_tab_content}><LoanLoanDetails/></div>}
        {activeTab === "pending" && <div className={css.client_tab_content}><LoanRiskScore/></div>}
        {activeTab === "active" && <div className={css.client_tab_content}><LoanDocument/></div>}
      </div>
      </div>
        
        </div>
      </div>
  );
}
