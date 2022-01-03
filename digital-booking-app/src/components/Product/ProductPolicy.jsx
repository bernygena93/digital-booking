import style from "../styles/productDetail.module.css";
import Title from "./Title";
import React, { useState, useEffect } from "react";

export default function ProductPolicy({ product }) {
  let [houseRulesList, setHouseRulesList] = useState([])
  let [healthAndSecurityList, setHealthAndSecurityList] = useState([])
  let [cancelPolicyList, setCancelPolicyList] = useState([])

  useEffect(() => {
    setHouseRulesList([product.houseRules]);
    setHealthAndSecurityList([product.healthAndSecurity]);
    setCancelPolicyList([product.cancelPolicy]);
  }, [])

  useEffect(() => {
    if(houseRulesList.length !== 0) {
      if (houseRulesList[0].includes("\n")) {
        const array = houseRulesList[0].split("\n");
        setHouseRulesList(array)
      }
    }
  }, [houseRulesList])

  useEffect(() => {
    if(healthAndSecurityList.length !== 0) {
      if (healthAndSecurityList[0].includes("\n")) {
        const array = healthAndSecurityList[0].split("\n");
        setHealthAndSecurityList(array)

      }
    }
  }, [healthAndSecurityList])

  useEffect(() => {
    if(cancelPolicyList.length !== 0) {
      if (cancelPolicyList[0].includes("\n")) {
        const array = cancelPolicyList[0].split("\n");
        setCancelPolicyList(array)

      }
    }
  }, [cancelPolicyList])

  return (
    <div className={style.productPolicy}>
      <Title title={"¿Qué tenés que saber?"} />
      <div className={style.policyBlock}>
        <div className={style.policies}>
          <div className={style.policy}>
            <h3>Normas de la casa</h3>
            <ul className={style.policyList}>
            {houseRulesList.map((houseRule, i) => {
              return <li key={"policy" + i}>{houseRule}</li>
            } )}
            </ul>
          </div>
          <div className={style.policy}>
            <h3>Salud y seguridad</h3>
            <ul className={style.policyList}>
            {healthAndSecurityList.map((healthAndSecurityPolicy, i) => {
              return <li key={"policy" + i}>{healthAndSecurityPolicy}</li>
            } )}
            </ul>
          </div>
        </div>
        <div className={style.policies}>
          <div className={style.policy}>
            <h3>Política de cancelación</h3>
            <ul className={style.policyList}>
              {cancelPolicyList.map((cancelPolicy, i) => {
                return <li key={"policy" + i}>{cancelPolicy}</li>
              } )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
