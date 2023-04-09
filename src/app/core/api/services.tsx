// GATEWAYS SERVICES

//GetAll Gateways
export const fetchGateways = async () => {
  const res = await fetch('http://localhost:3000/gateways');

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
};

//GetOne Gateway
export const fetchGateway = async (id: Number) => {
  const res = await fetch(`http://localhost:3000/gateways/${id}`);

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

//Post Gateway
export const PostGateway = async (newGateway: any) => {
  const res = await fetch('http://localhost:3000/gateways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newGateway)
  });

  if (!res.ok) {
    throw new Error('Failed to insert new Gateway');
  }
  return res.json();
};

//Delete Gateway
export const DeleteGateway = async (id: string) => {
  const res = await fetch(`http://localhost:3000/gateways/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Failed to delete new Gateway');
  }
};

// Update Gateway
export const UpdateGateway = async (updatedGateway: any, id: string) => {
  console.log(id);
  const res = await fetch(`http://localhost:3000/gateways/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedGateway)
  });

  if (!res.ok) {
    throw new Error('Failed to insert new Gateway');
  }
  return res.json();
};

// PERIPHERALS SERVICES
export const fetchPeripherals = async () => {
  const res = await fetch('http://localhost:3000/peripherals');

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};
