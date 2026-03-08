import React from 'react';
import './SimplePage.css';

export default function ComplaintsAppealsProcedure() {
    return (
        <div className="page-container">
            <header>
                <h1>Complaints & Appeals Procedure</h1>
                <p className="paragraph">
                    HORAS Cert is committed to handling complaints and appeals in a fair, transparent, and timely manner. This procedure ensures that all complaints and appeals are properly received, investigated, and resolved while maintaining impartiality and confidentiality.
                </p>
            </header>

            <section className="section">
                <h2 className="section-title">Common Process for Both Complaints and Appeals</h2>

                <h3 className="section-title" style={{ fontSize: '20px', marginTop: '30px' }}>4.1.1 Acknowledgement and Record</h3>
                <p className="paragraph">
                    Upon receipt, complaints and appeals are acknowledged to sender within five working days, MD shall liaise concerned person, in order to solve. For complaint and appeal received from a complainant or appellant, which is not a HORAS client, the consideration shall be given whether it is appropriate to answer, taking into account potential liability. In such cases, content of the answer is coordinated with client.
                </p>
                <p className="paragraph">
                    This process is subject to requirements for confidentiality.
                </p>

                <h3 className="section-title" style={{ fontSize: '20px', marginTop: '30px' }}>4.1.2 Responsibility for Investigation</h3>
                <p className="paragraph">
                    Personnel who investigate complaints and appeals shall be different from those who carried out the audits and made certification decision, without discrimination against the appellant or complainant.
                </p>
                <p className="paragraph">
                    The Appeals panel shall be comprised of members from the Impartiality Committee or personnel who the Impartiality Committee considers competent to review the appeal.
                </p>

                <h3 className="section-title" style={{ fontSize: '20px', marginTop: '30px' }}>4.1.3 Resolution Process</h3>
                <p className="paragraph">
                    The resolution process includes the following steps:
                </p>
                <ul className="list">
                    <li>Investigation, including business impacts and analysis of the situation</li>
                    <li>Structured response (root cause analysis, correction, corrective action)</li>
                    <li>Implementation of correction and corrective action</li>
                    <li>Information to the client of findings and actions taken</li>
                    <li>Monitoring of results: check if the solution is implemented and effective</li>
                    <li>Record and traceability of documents</li>
                    <li>Follow up on sustainability of results and of resolution</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">4.2 Appeal Process</h2>
                <p className="paragraph">
                    Appeals are dealt at the level where decision making was done and included in the preparation of HORAS Impartiality meeting.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">4.3 Complaint Process</h2>
                <p className="paragraph">
                    Complaint can be written (Formal Letter, Email, Website) or verbal (Phone Call, Feedback during sales visit or audit).
                </p>
                <p className="paragraph">
                    Complaints are handled at contracting entity level. An audit may be initiated to proceed with investigation, and the client shall be notified with reasons for the audit.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">4.4 Timeframe</h2>
                <p className="paragraph">
                    An initial response shall be made to the complainant within five working days.
                </p>
                <p className="paragraph">
                    The closure timeframe is within 90 days from the date of receipt of the Appeal /complaint, HORAS will provide the client with liberty to approach the Accreditation Board in case client is not satisfied or the complaint has not been resolved.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">1. References</h2>
                <ul className="list">
                    <li>ISO 17021-1:2015</li>
                </ul>
            </section>
        </div>
    );
}
