import { useEffect, useState } from "react";

export default function Admin_Home() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  console.log("🟢 Component Render");

//   // --------------------------------
//   // Timer
//   // --------------------------------

//   useEffect(() => {
//     console.log("⏱️ Timer Effect START");

//     const timer = setInterval(() => {
//       setSeconds(prev => prev + 1);

//       console.log("⏱️ Timer Tick");
//     }, 1000);

//     return () => {
//       console.log("🛑 Timer Cleanup");

//       clearInterval(timer);
//     };
//   }, []);

  // --------------------------------
  // Effect 1
  // --------------------------------

  useEffect(() => {
    console.log("🔵 Effect 1 START");

    async function methodA() {
      console.log("🔵 methodA START");

      await new Promise(resolve => {
        console.log("⏳ methodA waiting 5 seconds...");

        setTimeout(resolve, 5000);
      });

      console.log("🔵 methodA END");
    }

    async function methodB() {
      console.log("🔵 methodB START");

      await new Promise(resolve => {
        console.log("⏳ methodB waiting 2 seconds...");

        setTimeout(resolve, 2000);
      });

      console.log("🔵 methodB END");
    }

    console.log("➡️ Calling methodA");
    methodA();

    console.log("➡️ Calling methodB");
    methodB();

    console.log("🔵 Effect 1 END");
  }, []);

  // --------------------------------
  // Effect 2
  // --------------------------------

  useEffect(() => {
    console.log("🟣 Effect 2 START");

    async function methodC() {
      console.log("🟣 methodC START");

      await new Promise(resolve => {
        console.log("⏳ methodC waiting 1 second...");

        setTimeout(resolve, 1000);
      });

      console.log("🟣 methodC END");
    }

    async function methodD() {
      console.log("🟣 methodD START");

      await new Promise(resolve => {
        console.log("⏳ methodD waiting 4 seconds...");

        setTimeout(resolve, 4000);
      });

      console.log("🟣 methodD END");
    }

    console.log("➡️ Calling methodC");
    methodC();

    console.log("➡️ Calling methodD");
    methodD();

    console.log("🟣 Effect 2 END");
  }, []);

  // --------------------------------
  // Effect 3
  // --------------------------------

  useEffect(() => {
    console.log("🟠 Effect 3 START");

    async function methodE() {
      console.log("🟠 methodE START");

      await new Promise(resolve => {
        console.log("⏳ methodE waiting 3 seconds...");

        setTimeout(resolve, 3000);
      });

      console.log("🟠 methodE END");
    }

    console.log("➡️ Calling methodE");

    methodE();

    console.log("🟠 Effect 3 END");
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>

      <h2>Timer: {seconds} seconds</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}