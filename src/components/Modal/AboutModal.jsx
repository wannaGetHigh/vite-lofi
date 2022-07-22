import { useContext, useState } from 'react'

import { AppContext } from '../../context'
import Button from '../Button'
import {
	clockIcon,
	closeIcon,
	instagramIcon,
	twitterIcon,
	arrowLeftIcon,
} from '../../assets/icons'

function AboutModal() {
	const { setModalType } = useContext(AppContext)
	const [about, setAbout] = useState('about')

	return (
		<div classNameName="absolute inset-0 p-8 bg-transparent-b-70 z-40 select-none">
			<Button
				classNameName="absolute right-4 top-4"
				onClick={() => setModalType(null)}
			>
				<img src={closeIcon} alt="close" />
			</Button>

			{about === 'about' && (
				<div classNameName="flex flex-col justify-center items-center">
					<h1 classNameName="text-[46px] font-bold my-8">About us</h1>
					<p classNameName="w-3/5 text-base text-center mx-16">
						As (mostly) students, we understand how difficult it is to just sit
						at your desk and focus. Especially when you have to set your music,
						timer and notes from three different devices or websites, while
						getting bombarded with ads, maybe of yet another productivity tool.
						We made lofi.co as a way to help you fix this and finally have a
						personal, calm digital space to work, study or just unwind. With a
						growing library of 20+ original interactive illustrations, 15+
						calming ambient sounds and powerful but still easy-to-use tools like
						our timer with time-tracked tasks, we are now building what aims to
						be the go to platform for everyone working at their computer, with
						the goal of making productivity less stressful.
						<br />
						<br />
						We are constantly improving, make sure to follow our socials to stay
						updated!
					</p>
					<div classNameName="flex my-16">
						<Button classNameName="bg-br rounded-lg py-3 px-8 m-4 hover:scale-105 hover:opacity-80">
							<a
								href="https://www.instagram.com/lofi/"
								target="_blank"
								rel="noreferrer"
								classNameName="flex items-center justify-between"
							>
								<img
									src={instagramIcon}
									alt="twitter"
									classNameName="fill-[#1D93DF]"
								/>
								<h4 classNameName="text-xl font-bold mx-4">Instagram</h4>
							</a>
						</Button>

						<Button classNameName="bg-br rounded-lg py-3 px-8 m-4 hover:scale-105 hover:opacity-80">
							<a
								href="https://twitter.com/lofidotco"
								target="_blank"
								rel="noreferrer"
								classNameName="flex items-center justify-between"
							>
								<img
									src={twitterIcon}
									alt="twitter"
									classNameName="fill-[#1D93DF]"
								/>
								<h4 classNameName="text-xl font-bold mx-4">Twitter</h4>
							</a>
						</Button>

						<Button classNameName="bg-br flex items-center justify-between rounded-lg py-3 px-8 m-4 hover:scale-105 hover:opacity-80">
							<img
								src={clockIcon}
								alt="twitter"
								classNameName="fill-[#1D93DF]"
							/>
							<h4 classNameName="text-xl font-bold mx-4">hello@lofi.com</h4>
						</Button>
					</div>

					<div classNameName="flex items-center">
						<Button
							classNameName="p-[18px] text-lg font-bold"
							onClick={() => setAbout('term')}
						>
							Terms & Conditions
						</Button>

						<div classNameName="border-l w-px h-5 border-white"></div>

						<Button
							classNameName="p-[18px] text-lg font-bold"
							onClick={() => setAbout('privacy')}
						>
							Terms & Conditions
						</Button>
					</div>
				</div>
			)}

			{about === 'term' && <TermAndconditions setAbout={setAbout} />}
			{about === 'privacy' && <PrivacyPolicity setAbout={setAbout} />}
		</div>
	)
}

function TermAndconditions({ setAbout }) {
	return (
		<div classNameName="w-3/4 min-w-[600px] h-full m-auto overflow-y-auto select-none text-sm">
			<div classNameName="flex items-center">
				<Button>
					<img
						src={arrowLeftIcon}
						alt="back"
						classNameName="w-[22px] h-[22px] mx-8"
						onClick={() => setAbout('about')}
					/>
				</Button>
				<h1 classNameName="text-[46px] font-bold my-8">Term and Conditions</h1>
			</div>
			<p classNameName="font-bold">Welcome to our website.&nbsp;</p>
			<p>&nbsp;</p>
			<p>
				<span>
					If you continue to browse and use this website, you are agreeing to
					comply with and be bound by the following terms and conditions of use,
					which together with our privacy policy govern Lofi.co relationship
					with you in relation to this website. If you disagree with any part of
					these terms and conditions, please do not use our website.
				</span>
			</p>
			<p>
				<span>
					The term 'Lofi.co' or 'us' or 'we' refers to the owner of the
					website&nbsp;{' '}
				</span>
				<a href="http://www.lofi.co/">
					<span classNameName="text-primary">http://www.lofi.co/</span>
				</a>
				<span>
					. The term 'you' refers to the user or viewer of our website. Your use
					of this website constitutes a contract with us.&nbsp;
				</span>
			</p>
			<p>&nbsp;</p>
			<p classNameName="font-bold">Terms of Service</p>
			<p>
				<span>
					We offer a variety of products on our platform customized to meet your
					personal preference such as choosing a lofi background music loop
					based on your mood, you may customize it with sounds by interacting
					with original artworks and enjoy our productivity suite of tools.
				</span>
			</p>
			<p>
				<span>The music played on </span>
				<a href="http://lofi.co" className="text-primary">
					<span>lofi.co</span>
				</a>
				<span> is owned by </span>
				<a href="http://lofi.co" className="text-primary">
					<span>lofi.co</span>
				</a>
				<span>
					{' '}
					unless stated otherwise. Any use is strictly prohibited.&nbsp;
				</span>
			</p>
			<p>
				<span>The illustrations on </span>
				<a href="http://lofi.co" className="text-primary">
					<span>lofi.co</span>
				</a>
				<span>
					{' '}
					are originally made for lofi.co. We own exclusive usage &amp;
					commercial rights. You are not allowed to use any of the art in any
					way. Premium plan users may be allowed to download selected
					illustrations to be used as wallpapers.&nbsp;
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">USER REPRESENTATIONS</p>
			<p>
				<span>By using the Site, you represent and warrant that:&nbsp;</span>
			</p>
			<p>
				<span>
					(1) all registration information you submit will be true, accurate,
					current, and complete;&nbsp;
				</span>
			</p>
			<p>
				<span>
					(2) you will maintain the accuracy of such information and promptly
					update such registration information as necessary;
				</span>
			</p>
			<p>
				<span>
					(3) you will not access the Site through automated or non-human means,
					whether through a bot, script, or otherwise;&nbsp;
				</span>
			</p>
			<p>
				<span>
					(4) you will not use the Site for any illegal or unauthorized
					purpose;&nbsp;
				</span>
			</p>
			<p>
				<span>
					(5) your use of the Site will not violate any applicable law or
					regulation.
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">USER REGISTRATION</p>
			<p>
				<span>
					You may be required to register with the Site. You agree to keep your
					password confidential and will be responsible for all use of your
					account and password. We reserve the right to remove, reclaim, or
					change a username you select if we determine, in our sole discretion,
					that such username is inappropriate, obscene, or otherwise
					objectionable.
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">MODIFICATION OF THE SERVICE</p>
			<p>
				<span>
					We reserve the right, at any time, to modify, suspend, or discontinue
					the Service or any part thereof with or without notice.
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">THIRD-PARTY WEBSITES&nbsp;</p>
			<p>
				The Site may contain links to other websites ("Third-Party Websites") as
				well as articles, photographs, text, graphics, pictures, designs, music,
				sound, video, information, applications, software, and other content or
				items belonging to or originating from third parties ("Third-Party
				Content"). We are not responsible for any Third-Party Websites accessed
				through the Site or any Third-Party Content posted on, available
				through, or installed from the Site.
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">General Limitation of Liability</p>
			<p>
				<span>
					Lofi.co provides the Site on an “as is” basis and makes no
					representations whatsoever about any other web site which you may
					access through the Site or which may link to this Site. When you
					access a site outside the Site, please understand that it is
					independent from the Site and that Lofi.co has no control over the
					content on that web site. In addition, a link to the Site does not
					mean that Lofi.co endorses or accepts any responsibility for the
					content, or the use, of such a web site.
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">Indemnification</p>
			<p>
				<span>
					You agree to indemnify, defend and hold harmless the Site, its
					officers, directors, employees, agents, licensors, suppliers and any
					third-party information providers to the Service from and against all
					losses, expenses, damages and costs, including legal costs: -&nbsp;
				</span>
			</p>
			<ol>
				<li>
					<span>
						resulting from any violation of these terms and conditions
						(including negligent or wrongful conduct) by you or any other person
						accessing the Site and its services;
					</span>
				</li>
				<li>
					<span>
						howsoever arising as, a result of you downloading files from the
						Site or that we include links to; and,&nbsp;
					</span>
				</li>
				<li>
					<span>
						howsoever arising as, a result of any action you take as either a
						direct or indirect result of information, opinions or other
						materials on the Site, or generated from the Site and its services.
					</span>
				</li>
			</ol>
			<p>&nbsp;</p>
			<p className="font-bold">Governing law and disputes</p>
			<p>
				<span>
					This Agreement shall be governed by and constructed exclusively in
					accordance with the laws of Italy. Any legal action or proceeding
					between Lofi.co and you&nbsp; concerning this Agreement or the
					parties' obligations hereunder shall be brought exclusively in a court
					of competent jurisdiction sitting in Italy.&nbsp;
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">Refund Policy</p>
			<p>
				<span>
					We offer a 7 day money-back guarantee on our premium plans. Please
					note that the refund is not automatically issued once you cancel your
					membership, but you will need to send us an e-mail using the 'Contact
					Us' form, with the same details used during registration. The refund
					will be issued as soon as we receive your message and you will see it
					in your balance within 7-10 business days.
				</span>
			</p>
			<p>&nbsp;</p>
			<p className="font-bold">CONTACT INFORMATION</p>
			<p>
				<span>
					For any assistance or clarification kindly reach out to us via:
				</span>
			</p>
			<p>
				<span>Email: hello@lofi.co</span>
			</p>
		</div>
	)
}

function PrivacyPolicity({ setAbout }) {
	return (
		<div classNameName="w-3/4 min-w-[600px] h-full m-auto overflow-y-auto select-none text-sm">
			<div classNameName="flex items-center">
				<Button>
					<img
						src={arrowLeftIcon}
						alt="back"
						classNameName="w-[22px] h-[22px] mx-8"
						onClick={() => setAbout('about')}
					/>
				</Button>
				<h1 classNameName="text-[46px] font-bold my-8">Privacy Policity</h1>
			</div>
			<p>
				By interacting with us, submitting Information to us, or signing up for
				any promotions or services offered by us, you agree. Consent to Lofi.co
				its related corporations and affiliates
				<strong>
					&nbsp;(collectively referred to herein as "Lofi.co" "us," "we" or
					"our"), as well as our respective representatives, collecting, using,
					disclosing, and sharing&nbsp;
				</strong>
				amongst themselves your Personal Information, and disclosing such
				Personal Information to Lofi.co authorized service providers and
				relevant third parties in the manner outlined in this
				<strong>&nbsp;Privacy Policy.</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>
					We value your privacy and have taken the necessary measure to protect
					it.
				</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>What is Personal Information?</strong>
			</p>
			<p>
				"Personal Information" refers to any information or Information about
				you that can be used to identify you either from the Information we have
				or are likely to access. In this context, such Information
			</p>
			<p>maybe as follows:</p>
			<ol>
				<li>
					Your name, identification number, telephone number(s), e-mail address
					or mailing address, and any other information relating to you have
					provided us in any form you may have submitted to us or other forms of
					interaction with you.&nbsp;
				</li>
				<li>
					Information about your use of Lofi.co's website and services,
					including cookies, IP address, subscription account details, and
					membership details, but only to the extent that Lofi.co may identify
					you from such information.
				</li>
				<li>
					Information about your usage of and interaction with our website and
					services, including computer and connection information, device
					capability, bandwidth, statistics on page views, and traffic to and
					from our website.
				</li>
			</ol>
			<p>
				<strong>How is personal information collected or obtained?</strong>
			</p>
			<p>
				We are likely to collect your personal information through the following
				channels: -
			</p>
			<ol>
				<li>On our website when you reach out to us for our services.</li>
				<li>
					Contact us for customer service or for other business purposes through
					our contact information such as our email.
				</li>
			</ol>
			<p>
				<strong>How is the collected personal information used?</strong>
			</p>
			<p>&nbsp;</p>
			<ul>
				<li>
					We will use your information to contact you regarding any services you
					will need and any related purposes. We may contact you via regular
					E-mail, SMS, Telephone, or other electronic means.
				</li>
				<li>
					If we need to use your information for any other purposes, we will
					notify you and obtain your consent beforehand. You will be allowed to
					withhold or withdraw your consent to use your information for these
					additional purposes.
				</li>
			</ul>
			<p>&nbsp;</p>
			<p>
				<strong>How is your personal information disclosed?</strong>
			</p>
			<p>
				<strong>&nbsp;</strong>
			</p>
			<ol>
				<ol>
					<li>We will not sell your information to third parties.</li>
					<li>
						Disclosure of your Information to third parties shall only where you
						have provided us consent and, in the situations, expressly set out
						in this Policy.&nbsp;
					</li>
					<li>
						Your Information may be disclosed and shared within the Lofi.co to
						provide the requested products and services.
					</li>
					<li>
						We may disclose or share your Information with third parties
						(including other companies within the Lofi.co who provide necessary
						services to us).
					</li>
					<li>
						We will also disclose your information to third parties to comply
						with legal obligations or industry requirements. This includes
						disclosures to legal, regulatory, governmental, tax, and law
						enforcement authorities.
					</li>
					<li>
						Our website may have the functionalities to share your Information
						with other third parties, such as other users of our website. You
						are responsible for your choice(s) and are deemed to have provided
						consent for any sharing of your Information in the manner provided
						by the website.
					</li>
				</ol>
			</ol>
			<p>&nbsp;</p>
			<p>
				<strong>DISCLAIMER</strong>: Our websites may contain links to other
				websites which are not owned or maintained by us. When visiting these
				third-party websites or disclosing your information to third parties
				(including buyers or sellers on our website), you should read their
				privacy policies or ask relevant questions before disclosing your
				Information. We are not responsible for collecting, using, or telling
				your Information by such third parties.
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>Storage and processing of information</strong>
			</p>
			<p>
				All information collected through the Website will be stored and
				processed within the United States of America.
			</p>
			<p>
				By registering for and using the Website, you consent to the transfer of
				information to the Italy or to any other country in which we maintain
				facilities and the use and disclosure of information about you as
				described in this Privacy Policy.
			</p>
			<p>
				We use commercially reasonable safeguards to help keep the information
				collected through the Website secure and take reasonable steps (such as
				requesting a unique password) to verify your identity before granting
				you access to your account. To help us keep your information safe, we
				expect you to maintain the secrecy of your unique password and account
				information.
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>Data retention</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				We shall retain personal data collected for a reasonable time frame,
				which will vary depending on the nature of the data and whether the data
				may be needed for future legitimate use.
			</p>
			<p>
				Following termination or deactivation of your website account, we may
				retain information (including your profile information) for a
				commercially reasonable time for backup, archival, and/or audit
				purposes.
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>Your control over information</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				You may, at any time, edit, update or delete your profile information
				from the Website. However, when you delete or update information, we
				follow a process to ensure that the modification or deletion is not
				accidental or malicious. Accordingly, there may be delays between when
				you edit/delete information and when copies are edited/deleted from our
				active and backup systems.
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>Changes to the Privacy Policy</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				We may update this privacy policy from time to time. If a revision to
				the Privacy Policy, we shall endeavor to provide you with reasonable
				notice prior to the revised Privacy Policy taking effect.{' '}
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>CONTACT INFORMATION</strong>
			</p>
			<p>&nbsp;</p>
			<p>
				For any more information or clarification, please contact us through the
				following: -
			</p>
			<p>&nbsp;</p>
			<p>
				<strong>E-mail: hello@lofi.co</strong>
			</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
		</div>
	)
}

export default AboutModal
