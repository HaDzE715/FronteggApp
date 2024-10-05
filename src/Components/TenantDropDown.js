import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TenantDropDown = () => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState();
  const token = `${process.env.REACT_APP_TOKEN}`;
  const apiUrl = `${process.env.REACT_APP_TENANTS_API}`;

  const fetchTenants = useCallback(async () => {
    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${token},`,
      },
    };

    try {
      const response = await axios.request(options);
      const tenantsItems = response.data.items;
      setTenants(tenantsItems);
    } catch (error) {
      console.error("Error fetching tenants", error);
    }
  }, [token, apiUrl]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleTenantChange = async (e) => {
    const selectedTenantId = e.target.value;
    setSelectedTenant(e.target.value);

    if (!selectedTenantId) {
      // To prevent the placeholder to be fetched
      console.log("No tenant selected");
      return;
    }

    const options = {
      method: "PUT",
      url: `${apiUrl}/${selectedTenantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {},
    };

    try {
      const response = await axios.request(options);
      console.log("Success switch to tenant:", response.data);
    } catch (error) {
      console.error("Error switching to tenant:", error);
    }
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      margin: "20px auto",
    },
    label: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    select: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
    },
    option: {
      fontSize: "16px",
      padding: "8px",
    },
  };
  return (
    <div style={styles.container}>
      <label htmlFor="tenantDropDown"> Select Tenant: </label>
      <select
        id="tenantDropDown"
        value={selectedTenant}
        onChange={handleTenantChange}
      >
        <option value=""> Select a tenant</option>
        {tenants.map((tenant) => (
          <option key={tenant.tenantId} value={tenant.tenantId}>
            {tenant.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TenantDropDown;
