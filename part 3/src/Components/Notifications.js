const Notification = ({ NotificationM }) => {
  if (NotificationM === null) {
    return;
  } else {
       const { message, color } = NotificationM;
      return (
        <>
          <div className={`container ${color}`}>
            <h3>{message}</h3>
          </div>
        </>
      ); 
  }
};

export default Notification;


