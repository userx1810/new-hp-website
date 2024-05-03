async function redirectToPageWithToken(token, pageUrl) {
  if (token) {
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = pageUrl;
  }
}

const token = localStorage.getItem("token");

const pageUrl = "/index.html";

redirectToPageWithToken(token, pageUrl);
