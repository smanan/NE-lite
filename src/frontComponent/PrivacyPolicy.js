import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Dictionary(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })
  return (
    <>
     

      <div className="mainbox">
      <Link className="navbar-brand" to="/"> <img src="./images/back-btn.png" class="extbtn mart20p" alt="..." height="30px" width="30px"></img></Link>
        <div className='dict about-bot'>


        <h1 class="privacy-policy">Privacy Policy</h1>
        <p>NE Games, firmly believes in the privacy of all our customers. At all times of our dealings
             and beyond that we respect and protect the privacy of our users, whatsoever. All the
              websites belonging to NE Games will be governed by these privacy policies.
               The policies will be covering all the information submitted by the user as
                well as information available on the site for access or viewing purposes. 
                The privacy policies mentioned below would let you understand clearly the
                 way we will be using your information and the steps you can consider to protect
                  your privacy.</p>
                  <h2 class="terms-marg">The Privacy Policies mentioned below covers:</h2>
                  <ul class="float-none mb-3 list-privacy">
							 <li>The information collected by the company and the reason for which it is collected</li>
							 <li>Usage guidelines for the information collected</li>
							 <li>Options for protecting your privacy and steps for accessing and updating the information</li>
						  </ul>

                          <p>All the privacy policies have been explained in simple manner with reference to certain terms that are used commonly in the domain we provide our services. We are always concerned about the privacy of our users so even if you are an existing or new user, kindly go through our privacy policies for better understanding of the way we work.</p>

<h2 class="terms-marg">Information collected by the company</h2>
<p>In general our website can be visited by any user without providing any personal information or data. In addition to that there are certain occasions where we might request your personal details in terms of name, email-id, address, company name, contact number, etc. The company keeps all the information provided during the course of interaction strictly confidential.</p>

<p>In any condition while using your information for a purpose other than those mentioned in the Privacy Policy your consent will be asked prior to using the information.</p>
<h2 class="terms-marg">Usage guidelines for information collected</h2>
<p>The information collected by our website is used for monitoring, analyzing trends, maintaining and improving statistics related to our website. It allows us to improve and provide better services to our valued users. While contacting us, we might record all the interaction in order to resolve issues related to our services or website. The contact information provided by the user might be used for informing about new services or updates to our website. The information collected through cookies is used to improve the quality and user experience.</p>
<p>In case of merger or/and business reorganization, we may be required to share information as desired according to the situation.</p>
<p>In any condition while using your information for a purpose other than those mentioned in the Privacy Policy your consent will be asked prior to using the information.</p>
<h2 class="terms-marg">Options for protecting your privacy</h2>
<p>Every user has different privacy concerns and this is the reason we want to be clear about the information collected by us. It will be helpful in making up your decision about whether to choose our services or not.</p>
<p>Although we never share any information provided by the user in any case, except certain special conditions as mentioned above, if any information is shared publicly on our website, it might be indexed by the search engines.</p>
<h2 class="terms-marg">Shared Information</h2>
<p>Although we never share any information provided by the user in any case, except certain special conditions as mentioned above, if any information is shared publicly on our website, it might be indexed by the search engines.</p>
<h2 class="terms-marg">How to access and update your personal information</h2>
<p>If regarding any issue you want to contact us, we require you to provide us with your personal information, however, if at any time you think that the information provided is not correct then you can either fill the contact form again or inform us on the given email address. At times, we may even ask you to prove your identity before acting on your request. We strive towards protecting your information from any kind of malicious attacks and this is why we may not delete your information immediately from our servers.</p>
<h2 class="terms-marg">Securing your information</h2>
<p>We constantly work towards protecting our company and associated users' information from malicious attacks or data thefts. We perform regular checks to ensure that all the information collected by us is properly stored, processed and enforced with all the security measures to avoid unauthorized access to any kind of sensitive data.</p>



<h2  class="terms-marg">Where do these privacy policies apply</h2>
						  <p>These Privacy Policy apply to all our services included on our website and does not apply to any other services other than those mentioned on the website. The Privacy Policy mentioned on this page does not hold any responsibility for an outside company advertising or promoting our services in any way.</p>
						  <h2  class="terms-marg">How do we enforce</h2>
						  <p>We regularly perform checks on our privacy policies. In case of any complaints made by a user, we get in contact with the user to follow up. On our end we will try to resolve the matter in as short a time as possible with clarity on each aspect.</p>
						  <h2  class="terms-marg">Modifications in Privacy Policy</h2>
						  <p>All the Privacy Policy mentioned on this page might change depending on time and situation without any prior notice. All types of changes in this regard will be posted on this page only. No rights of an existing user will be reduced without their consent.</p>
					  
					  <p> <strong>NE–<i>Lite</i></strong> app doesn’t have third-party analytics, third-party advertising, share the data with any third parties. collect any user or device data for purposes beyond third-party analytics or third-party advertising.</p>


                      <h2  class="terms-marg">Data Collection</h2>

<p>We gather various types of personal information from our users, as explained more fully below. We may use this personal information to personalize and improve our services, to allow our users to set up a user account and profile, to contact users, to fulfill your requests for certain products and services, to analyze how users utilize the Platform and Services / Products, and as otherwise set forth in this privacy policy. We collect the following types of information:
</p>

<h2  class="terms-marg">Information you provide to us:</h2>
<p>
We receive and store any information you knowingly provide to us. For example, we collect personal
 information such as your name, username, email address, gender, birth date, weight, height, location, 
 nutrition data, workouts, physical activity, photographs, biometric information, and sleep habits 
 and we may collect other sleep, activity, or health-related information as our services and 
 products are further developed. You can choose not to provide us with certain information, 
 but then you may not be able to register with us or to take advantage of some of our features / 
 Services / Products. We may anonymize your personal information so that you cannot be individually 
 identified, and provide that information to our partners. For example, you may tell us that
 you are female and sleep an average of 6 hours per night; we may combine this information with 
 content received from our other users, and disclose to our partners that on the whole, our male
 users sleep more hours per night than our female ones, but we will not tell those partners who 
 you are.
</p>


<p>Whenever you interact with our Platform, we automatically receive and record information on our
	server logs from your browser including your IP address, 'cookie' information, device information
	and the page you requested. 'Cookies' are identifiers we transfer to your computer or mobile device 
	that allow us to recognize your browser or mobile device and tell us how and when pages in our 
	Platform are visited and by how many people. You may be able to change the preferences on your 
	browser or mobile device to prevent or limit your computer or device's acceptance of cookies, 
	but this may prevent you from taking advantage of our Platform's best features.</p>				   
		
		<p>When we collect usage information (such as the numbers and frequency of visitors to the Platform), we only use this data in aggregate form, and not in a manner that would identify you personally. For example, this aggregate data tells us how often users use parts of the Platform, so that we can make the Platform appealing to as many users as possible. </p>			   
		<p>	If you are using our Services / Products, you understand and acknowledge that, any information, data or readings from the Services / Products, or collected from your use thereof, will be automatically uploaded to your account with us. To the extent these automatically collected readings can be used to personally identify you, these readings are personal information for the purposes of this privacy policy.</p>		   
				

        <h2  class="terms-marg">Delete targeting cookies</h2>

<p>Your interest profile can be removed by deleting your browser's cookies.</p>

<h2  class="terms-marg">Information stored on cookies</h2>
<p>The cookie information stored on the User's hard drive is: (i) User segment hits or information
 on a specific Service / Product, service, brand or model in which the User has shown interest 
 during its visit to a certain website and (ii) time and date stamp of the latest update of the
 User profile.</p>

 <p>If the cookie is deleted by the User, all profile data is removed. For the sake
 of clarity, no segments relating to information which Company considers sensitive 
 have been or will be created, such as segments relating to the issue of children's 
 privacy and marketing directed to children. No segments are intended to be
 established for the profiling of children.</p>
				
	 <h2  class="terms-marg"> E-mail and other communications:</h2>
			<p>We may contact you, by email or other means; for example, we may send you promotional 
			offers on behalf of other businesses, or communicate with you about your use of the
			Platform or the Services / Products. Also, we may receive a confirmation when you 
			open an email from us. This confirmation helps us make emails more interesting and 
			improve our service. If you do not want to receive email or other mail from us, 
			please indicate your preference by emailing us at <br/> <a href="mailto:info@ne-lite.com">info@ne-lite.com</a></p>


        </div>

        
      </div>
    </>
  )
}
