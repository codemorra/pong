import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="grid min-h-screen place-items-center bg-slate-950 p-6 text-slate-100">
    <section class="text-center">
      <h1 class="text-4xl font-bold">Pong</h1>
      <p class="mt-2 text-slate-400">The game is being prepared.</p>
    </section>
  </main>
`;
