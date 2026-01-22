import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "../db" });
const eventos = Schema("eventos", {
  _id: { type: String },
  trigger: { type: Number },
  sample_rate_detected: { type: Number }
});

const lista = eventos.find();
console.log("Total eventos:", lista.length);
if (lista.length > 0) {
  console.log("Triggers disponibles:", lista.map(e => e.trigger).sort((a,b) => b-a).slice(0, 10));
  const evt774 = eventos.findOne({trigger: 774});
  if (evt774) {
    console.log("\nEvento 774 encontrado!");
    console.log("sample_rate_detected:", evt774.sample_rate_detected);
  }
}
