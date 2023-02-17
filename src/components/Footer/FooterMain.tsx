import React from "react";
import "./FooterMain.scss";

type FooterItem = {
  title: string;
  data: string;
  buttonText?: string;
  inputText?: string;
};

const FooterMain: React.FC = () => {
  const footerData: FooterItem[] = [
    {
      title: "Powered by IU",
      data: "Brainwave Inc., partners with leading universities and institutions across the globe to provide world-class online education in the fields of art and creative technology.",
    },
    {
      title: "Are you an Institution?",
      data: "BrainWave is always looking for new partners. Find out how you can start working with us today.",
      buttonText: "CONTACT US NOW",
    },
    {
      title: "Connect with BrainWave",
      data: "Enter your email to be the first to hear about updates and new courses offered by Kadenze.",
      inputText: "Email Address",
      buttonText: "STAY IN TOUCH",
    },
  ];

  return (
    <footer className="footer-main">
      {footerData.map((item: FooterItem, index: number) => (
        <div key={index} className="footer-item">
          <h3 className="footer-title">{item.title}</h3>
          <p className="footer-data">{item.data}</p>
          {item.inputText && <input type="text" placeholder={item.inputText} />}
          {item.buttonText && (
            <button className="footer-button">{item.buttonText}</button>
          )}
        </div>
      ))}
    </footer>
  );
};

export default FooterMain;
