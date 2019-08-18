const API_ENDPOINT = process.env.REACT_API_BACKEND_API_BASE;

export const getPrivateMessage = function(idToken) {
  return fetch(`${API_ENDPOINT}/private`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin"
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  });
};

export const getPublicMessage = function() {
  return fetch(`${API_ENDPOINT}/public`);
};

export const getHomework = function(idToken) {
  return fetch(`${API_ENDPOINT}/homeworks`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin"
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`Request homework rejected with status ${res.status}`);
    }
  });
}

export const postHomework = function (idToken, name, subject, details, school_id, Class) {
  return fetch(`${API_ENDPOINT}/homeworks`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({
          name: name,
          subject: subject,
          details: details,
          school_id: school_id,
          class: Class
        })
  }).then(res => {
    if (res.ok) {
          return "HOMEWORKのPOSTに成功しました。"
    } else {
      throw Error(`Post Homework rejected with status ${res.status}`);
        }
      })
}

export const getStudent = function(idToken) {
  return fetch(`${API_ENDPOINT}/students`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin"
  }).then(res => {
    if (res.ok) {
      return res.json();
      // return JSON.parse(res.json())
    } else {
      throw Error(`Request students rejected with status ${res.status}`);
    }
  });
}

export const postStudent = function (idToken, name, grade, school_id) {
  return fetch(`${API_ENDPOINT}/students`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${idToken}`
    },
    body: JSON.stringify({
      name: name,
      grade: grade,
      school_id: school_id,
    })
  }).then(res => {
    if (res.ok) {
      return "studentのPOSTに成功しました。"
    } else {
      throw Error(`Post student rejected with status ${res.status}`);
    }
  })
}