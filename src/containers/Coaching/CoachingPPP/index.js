import React, { Component } from 'react';
import './index.scss';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import FormTab from './form';
import Report from './report';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

class CoachingPPP extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      /* data: {
        student: {
          first_name: 'Test',
          last_name: 'Test',
          degree: 'dmd',
          address: '12312',
          city: '123',
          zip: '123',
          business_phone: '1123123',
          phone_number: '11231233',
          spending_report_months: 12,
          state: '123',
          specialty: 'prostho',
        },
        report: {
          total_production_for_spending_report: '12',
          production_last_calendar_year: 12,
          production_2_years_ago: 121212,
          total_collections_for_spending_report: 55555,
          collections_last_calendar_year: 123,
          'collections_2_years ago': 12,
          'avg_new_patients_last_3_typical_months ': '21',
          avg_of_doctor_patient_visits_month: '12',
          avg_of_clinical_hours_worked_month: '23',
          total_practice_debt_payment_month: '44',
          total_personal_debt_payment_month: '23',
          staff_salaries: 5,
          staff_payroll_taxes: 5,
          staff_payroll_expenses: 3,
          staff_medial_premiums: 3,
          staff_uniform_allowance: 3,
          staff_futa: 3,
          staff_ira: 3,
          admin_prof_fees: 2,
          admin_office_supplies: 3,
          admin_bank_charges: 2,
          admin_pt_parking: 5,
          admin_dues_subscriptions: 1,
          admin_collection_expense: 2,
          admin_hazardous_waste: 3,
          admin_laundry_services: 4,
          admin_licenses: 5,
          admin_insurance_malprac: 6,
          admin_insurance_oh: 87,
          admin_office_equipment: 1,
          admin_off_equip_repair_and_m: 2,
          admin_postage: 55,
          admin_taxes_corp: 22,
          admin_taxes_bus: 33,
          admin_taxes_personal_prop: 2,
          admin_telephone: 31,
          admin_credit_card_fee: 23,
          admin_nsf_checks: 23,
          admin_interest: 5,
          admin_misc: 5,
          occupancy_rent: 5,
          occupancy_decor: 5,
          occupancy_lease_improvements: 3,
          occupancy_repairs_and_maintenance: 45,
          occupancy_utilities: 22,
          occupancy_janitorial_security: 3,
          occupancy_waste_disposal: 2,
          occupancy_property_taxes: 1,
          hp_dental_equipment: 2,
          hp_repair_and_maintenance: 3,
          hp_office_furniture: 4,
          hp_staff_ce: 5,
          hp_other: 6,
          hp_equipment_payments: 7,
          marketing_advertising: 2,
          marketing_entertain_and_meals: 3,
          marketing_donations: 4,
          marketing_promotion: 5,
          laboratory: 2,
          laboratory_other: 3,
          supplies_dental: 4,
          supplies_ortho: 2,
          supplies_other: 5,
          doctor_salary_cash_draw: 5,
          doctor_auto_expense: 2,
          doctor_med_insurance: 55,
          doctor_disability_ins: 2,
          doctor_travel: 34,
          doctor_lodging: 4,
          doctor_payroll_taxes: 55,
          doctor_life_insurance: 23,
          doctor_personal_debt: 2,
          solvency_other: 2,
          roi_dr_ce: 3,
          roi_dr_investment: 4,
          roi_loan_pre_payment: 5,
          roi_interest_expense: 2,
          projected_growth_rate: '5',
          assumed_final_overhead_in_percentage: '3',
          estimated_first_irr: '4',
          estimated_second_irr: '5',
        },
        total: {
          staffCompensation: 25,
          occupancy: 86,
          resourceDev: 27,
          laboratory: 5,
          supplies: 11,
          solvency: 2,
          adminServices: 322,
          marketing: 14,
          doctorComp: 182,
          roi: 14,
        },
      }, */
      activeKey: 'form',
    };
  }

  setData = (data) => {
    this.setState({
      data,
      activeKey: 'report',
    });
  };

  render() {
    const { data, activeKey } = this.state;

    return (
      <StickyContainer>
        <Tabs
          defaultActiveKey="form"
          activeKey={activeKey}
          renderTabBar={renderTabBar}
          onChange={(activeKey) => {
            this.setState({
              activeKey,
            });
          }}
        >
          <TabPane tab="Form" key="form">
            <FormTab setData={this.setData} />
          </TabPane>
          <TabPane tab="Report" key="report" disabled={!data}>
            <Report data={data} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

CoachingPPP.propTypes = {};

export default CoachingPPP;
