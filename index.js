import fetch from "node-fetch";

const [, , method, endpoint, ...args] = process.argv;
const baseURL = "https://fakestoreapi.com";

async function main() {
  try {
    if (!method || !endpoint) return console.log("Comando inválido");

    if (method === "GET" && endpoint === "products") {
      const res = await fetch(`${baseURL}/products`);
      const data = await res.json();
      return console.log(data);
    }

    if (method === "GET" && endpoint.startsWith("products/")) {
      const id = endpoint.split("/")[1];
      const res = await fetch(`${baseURL}/products/${id}`);
      const data = await res.json();
      return console.log(data);
    }

    if (method === "POST" && endpoint === "products") {
      const [title, price, category] = args;
      if (!title || !price || !category) return console.log("Datos incompletos");
      const res = await fetch(`${baseURL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title,
          price: Number(price),
          category,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return console.log(data);
    }

    if (method === "DELETE" && endpoint.startsWith("products/")) {
      const id = endpoint.split("/")[1];
      const res = await fetch(`${baseURL}/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      return console.log(data);
    }

    console.log("Comando no reconocido");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

main();
