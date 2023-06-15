import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { format } from 'date-fns';

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

const calculateTimeDifference = (serverTime: Date, clientTime: Date):string => {
  const timeDifference = Math.abs(serverTime.getTime() - clientTime.getTime());

  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
interface ServerProps {
  serverTime: number;
}

export default function Home({serverTime} : ServerProps) {
  const router = useRouter();
  const browserTime = new Date(); // Retrieves browser time 
  const formattedServerTime = new Date(serverTime); //Formated serverTime number to Date 
  const between = calculateTimeDifference(formattedServerTime, browserTime); //store function which caculate difference between serverTime and browserTime in const between

  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {format(new Date(serverTime) , 'dd/MM/yyyy HH:mm:ss')}
          <p>
            Server time:{" "}
            <span className="serverTime">{serverTime}</span>
          </p>

          {between}
          <p>
            Time diff:{" "}
            <span className="serverTime">{between}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
  const serverTime = new Date().getTime(); // Retrieves the value of serverTime
  return {
    props: {
      serverTime,
    },
  };
};


