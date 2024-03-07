export async function getServerSideProps(context) {
    const serverTime = new Date().toString(); 
  
    return {
      props: { serverTime }, 
    };
  }
  
  function TimePage({ serverTime }) {
    return (
      <div>
        <h1>Server Time</h1>
        <p>The current server time is: {serverTime}</p>
      </div>
    );
  }
  
  export default TimePage;