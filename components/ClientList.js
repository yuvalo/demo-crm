import React, { useState, useEffect } from "react";
import axios from "axios";



const ClientList = () => {


  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await axios.get('/api/clients');
      setClients(data.data)
    }
    fetchClients()
  }, []);

  const getInitials = (name) => {
  }

  const renderedClients = clients.map((client) => {
    const initials = client.name.split(" ").shift().charAt(0).toUpperCase();

    return (
      <div key={client._id} className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full bg-amber-200	 w-16">
              <span className="text-xl">{initials}</span>
            </div>
          </div></figure>
        <div className="card-body">
          <h2 className="card-title">
            {client.name}
          </h2>
          <p className="text-amber-600">{client.company}</p>
          <p className="text-slate-400">{client.email}</p>
        </div>
      </div>

    )
  });

  return (
    <div className="flex gap-20">
      {renderedClients}
    </div>
  )
}

export default ClientList;
