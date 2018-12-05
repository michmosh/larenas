import React from "react";
import "./footer.css";
class PageFooter extends React.Component {
  
  render() {
      return (
        <footer className="blueviolet">
          <div className="social">
            <div className="social-text"> Get connected with us on social networks!</div>
            <ul>
              <li><i className="fa fa-facebook"></i></li>
              <li><i className="fa fa-instagram"></i></li>
              <li><i className="fa fa-twitter"></i></li>
              <li><i className="fa fa-google-plus"></i></li>
              <li><i className="fa fa-linkedin"></i></li>
            </ul>
           </div>
          <div className="footer-links">
              <div>
                  <h6 className="text-uppercase font-weight-bold">
                    <strong>Company name</strong>
                  </h6>
                  <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                  <p>
                    Here you can use rows and columns here to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
              </div>
              <div>
                  <h6 className="text-uppercase font-weight-bold">
                    <strong>Products</strong>
                  </h6>
                  <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }}/>
                  <p>
                    <a href="#!">MDBootstrap</a>
                  </p>
                  <p>
                    <a href="#!">MDWordPress</a>
                  </p>
                  <p>
                    <a href="#!">BrandFlow</a>
                  </p>
                  <p>
                    <a href="#!">Bootstrap Angular</a>
                  </p>
              </div>
              <div>
                   <h6 className="text-uppercase font-weight-bold">
                      <strong>Useful links</strong>
                  </h6>
                  <hr  className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                  <p>
                    <a href="#!">Your Account</a>
                  </p>
                  <p>
                    <a href="#!">Become an Affiliate</a>
                  </p>
                  <p>
                    <a href="#!">Shipping Rates</a>
                  </p>
                  <p>
                    <a href="#!">Help</a>
                  </p>
              </div>
          <div>
              <h6 className="text-uppercase font-weight-bold"> <strong>Contact</strong>  </h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                <p>
                  <i className="fa fa-home mr-3" /> New York, NY 10012, US
                </p>
                <p>
                  <i className="fa fa-envelope mr-3" /> info@example.com
                </p>
                <p>
                  <i className="fa fa-phone mr-3" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fa fa-print mr-3" /> + 01 234 567 89
                </p> 
            </div>
          </div>
          <div className="copyright">
           <p> &copy; { new Date().getFullYear() } MOSES-TECH-DESIGN  michmosh1@gmail.com  </p>
          </div>
        </footer>
      )
  }
}

export default PageFooter;
