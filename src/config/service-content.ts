/**
 * Long-form copy for each service detail page, keyed by service slug.
 * Facts (name, duration, prices) stay in clinic.config.ts. This file only
 * holds the explanatory copy. DEMO CONTENT: general information, not advice.
 */

import type { Faq } from "@/config/clinic.config";

export interface ServiceContent {
  /** One-line benefit for the page hero. */
  benefit: string;
  whatItIs: string[];
  whoItIsFor: string[];
  steps: { title: string; text: string }[];
  aftercare: string[];
  faqs: Faq[];
  related: string[];
}

export const serviceContent: Record<string, ServiceContent> = {
  "new-patient-exam": {
    benefit: "A thorough, unhurried first visit that ends with a clear written plan.",
    whatItIs: [
      "Your first appointment is a full assessment of your teeth, gums, jaw and soft tissues, with digital X-rays where they are needed.",
      "We take time to listen first. You leave with a written plan, itemised prices and no pressure to book anything.",
    ],
    whoItIsFor: [
      "Anyone joining the practice for the first time",
      "People who have not seen a dentist for a while",
      "Nervous patients who want to meet the team before treatment",
    ],
    steps: [
      { title: "A conversation first", text: "We talk through your history, any worries and what you would like from your smile." },
      { title: "Full examination", text: "Teeth, gums, bite and an oral cancer screen, explained as we go." },
      { title: "Digital X-rays", text: "Low-dose images, taken only if clinically needed and shown to you on screen." },
      { title: "Your written plan", text: "Options, timings and exact prices, sent to you by email the same day." },
    ],
    aftercare: [
      "There is no recovery time. You can eat, drink and go back to work straight away.",
      "Read your plan at home and ask us anything by phone or email.",
      "Book any follow-up online with the dentist of your choice.",
    ],
    faqs: [
      { q: "How long is the first appointment?", a: "We allow 45 minutes so nothing is rushed." },
      { q: "Do I have to have X-rays?", a: "No. We only recommend X-rays when they are clinically useful, and we always ask first." },
    ],
    related: ["hygiene-clean", "check-up", "teeth-whitening"],
  },

  "check-up": {
    benefit: "A regular check that keeps small problems small.",
    whatItIs: [
      "A routine examination for existing patients, usually every six months. We check teeth, gums and soft tissues and compare against your last visit.",
      "Catching changes early almost always means simpler, lower cost treatment.",
    ],
    whoItIsFor: [
      "Existing Northpoint patients",
      "Care Plan members, who have two check-ups a year included",
      "Anyone due their regular examination",
    ],
    steps: [
      { title: "Quick catch-up", text: "Anything new since last time, including medication or sensitivity." },
      { title: "Examination", text: "Teeth, gums, existing fillings and an oral cancer screen." },
      { title: "Advice and next steps", text: "Simple, practical tips and a note of anything to keep an eye on." },
    ],
    aftercare: [
      "No recovery needed.",
      "Keep up twice-daily brushing and daily cleaning between teeth.",
      "Book your next check-up before you leave, or online later.",
    ],
    faqs: [
      { q: "How often should I have a check-up?", a: "Most adults are seen every six months. Your dentist may suggest a different interval based on your mouth." },
      { q: "Is a check-up included in the Care Plan?", a: "Yes. Members have two check-ups a year at no extra cost." },
    ],
    related: ["hygiene-clean", "white-filling", "new-patient-exam"],
  },

  "hygiene-clean": {
    benefit: "A gentle, thorough clean that leaves teeth smooth and gums healthier.",
    whatItIs: [
      "A professional clean with our hygienist using Airflow: a warm stream of water and fine powder that lifts plaque and staining without scraping.",
      "Stubborn deposits are removed with fine ultrasonic tips, then teeth are polished.",
    ],
    whoItIsFor: [
      "Anyone with tea, coffee or red wine staining",
      "People with bleeding or tender gums",
      "Patients with braces, aligners, implants or crowns to maintain",
    ],
    steps: [
      { title: "Gum health check", text: "We measure and record your gum health so we can track it over time." },
      { title: "Airflow clean", text: "Warm water and powder gently remove plaque and surface staining." },
      { title: "Fine scale", text: "Any hardened deposits are removed with light ultrasonic tips." },
      { title: "Home care coaching", text: "Personal advice on brushing and cleaning between teeth." },
    ],
    aftercare: [
      "Avoid strongly coloured food and drink for about two hours.",
      "Gums can feel slightly tender for a day. This settles quickly.",
      "Most people benefit from a hygiene visit every six months.",
    ],
    faqs: [
      { q: "Does Airflow hurt?", a: "Most patients find it far more comfortable than a traditional scale and polish. Tell us if you have sensitive areas and we will adjust." },
      { q: "Can I book hygiene without seeing a dentist first?", a: "Yes. You can book directly with our hygienist online." },
    ],
    related: ["teeth-whitening", "check-up", "new-patient-exam"],
  },

  "white-filling": {
    benefit: "Repair a tooth invisibly with a filling matched to your natural shade.",
    whatItIs: [
      "A tooth-coloured composite filling restores a tooth affected by decay or wear. The material is bonded to the tooth and shaped so it blends in.",
      "It can also replace old metal fillings where that is clinically sensible.",
    ],
    whoItIsFor: [
      "Teeth with decay found at a check-up",
      "Chipped or worn teeth",
      "Patients who would like to replace visible metal fillings",
    ],
    steps: [
      { title: "Numbing", text: "Local anaesthetic, given slowly with numbing gel first." },
      { title: "Clean and prepare", text: "Decay is removed and the tooth is prepared for bonding." },
      { title: "Layer and shape", text: "Composite is placed in layers and set with a curing light." },
      { title: "Polish and bite check", text: "The filling is polished and adjusted so it feels natural." },
    ],
    aftercare: [
      "Wait until the numbness wears off before eating.",
      "Mild sensitivity to hot and cold is common for a few days.",
      "Call us if your bite feels high. It is a quick adjustment.",
    ],
    faqs: [
      { q: "How long do white fillings last?", a: "With good care, many last for years. Your dentist will check them at each visit." },
      { q: "Will it hurt?", a: "The tooth is fully numbed first. You should feel pressure but not pain." },
    ],
    related: ["check-up", "crown", "composite-bonding"],
  },

  "root-canal-front": {
    benefit: "Relieve pain and keep your natural tooth.",
    whatItIs: [
      "Root canal treatment removes infected tissue from inside a tooth, then cleans and seals the canal. It is carried out under local anaesthetic.",
      "Front teeth usually have a single canal, so treatment is often completed in one visit.",
    ],
    whoItIsFor: [
      "Teeth with deep decay or infection",
      "Teeth that have darkened after a knock",
      "Lingering pain or a recurring gum boil near a tooth",
    ],
    steps: [
      { title: "Assessment and X-ray", text: "We confirm the diagnosis and explain your options, including alternatives." },
      { title: "Numbing and isolation", text: "The tooth is fully numbed and protected with a small rubber sheet." },
      { title: "Clean and shape", text: "Infected tissue is removed and the canal is disinfected." },
      { title: "Seal", text: "The canal is filled and the tooth is sealed with a filling." },
      { title: "Review", text: "We check healing and advise if a crown would protect the tooth." },
    ],
    aftercare: [
      "The tooth may feel tender for a few days. Your dentist will advise on pain relief.",
      "Avoid biting hard foods on the tooth until it is fully restored.",
      "Contact us if you notice swelling or pain that is getting worse.",
    ],
    faqs: [
      { q: "Is root canal treatment painful?", a: "With modern anaesthetic it should feel similar to having a filling." },
      { q: "Why do prices differ between dentists?", a: "Fees reflect each clinician's experience and training. Complex cases may be best seen by our specialist." },
    ],
    related: ["crown", "emergency", "white-filling"],
  },

  crown: {
    benefit: "Restore strength and shape to a broken or heavily filled tooth.",
    whatItIs: [
      "A crown is a custom-made cap that covers a tooth to protect it and restore its shape. Ours are made in porcelain to match your neighbouring teeth.",
      "We scan your tooth digitally, so there are no putty impressions.",
    ],
    whoItIsFor: [
      "Broken or cracked teeth",
      "Teeth with very large fillings",
      "Teeth that have had root canal treatment",
    ],
    steps: [
      { title: "Plan and shade match", text: "We agree the shape and colour together." },
      { title: "Prepare and scan", text: "The tooth is shaped under anaesthetic and scanned in 3D." },
      { title: "Temporary crown", text: "You leave with a temporary crown while yours is made." },
      { title: "Fit", text: "About two weeks later, your crown is checked, adjusted and bonded in place." },
    ],
    aftercare: [
      "Avoid sticky foods while you have a temporary crown.",
      "Brush and clean around a crown exactly as you would a natural tooth.",
      "Tell us if the bite feels uneven after fitting.",
    ],
    faqs: [
      { q: "How many visits does a crown take?", a: "Usually two: one to prepare and scan, one to fit." },
      { q: "Can I spread the cost?", a: "Yes. Crowns are eligible for 0% finance, subject to status." },
    ],
    related: ["root-canal-front", "white-filling", "dental-implant"],
  },

  "teeth-whitening": {
    benefit: "A brighter smile, safely, at your own pace at home.",
    whatItIs: [
      "Professional home whitening uses custom-made trays and a prescribed gel. You wear the trays for a short time each day and see gradual, even results.",
      "In the UK, tooth whitening can only legally be provided by registered dental professionals.",
    ],
    whoItIsFor: [
      "Adults with healthy teeth and gums who want a lighter shade",
      "Anyone preparing for a wedding, interview or event",
      "Patients planning bonding who want to whiten first",
    ],
    steps: [
      { title: "Suitability check", text: "We check your teeth and gums and record your starting shade." },
      { title: "Scan for trays", text: "A quick 3D scan is used to make thin, comfortable trays." },
      { title: "Collect your kit", text: "We show you exactly how to use the gel and trays." },
      { title: "Review", text: "After 2 to 3 weeks we compare shades and plan top-ups." },
    ],
    aftercare: [
      "Some sensitivity is normal and temporary. Skipping a day usually helps.",
      "Limit tea, coffee and red wine while whitening.",
      "Keep your trays. A small top-up once or twice a year keeps the result.",
    ],
    faqs: [
      { q: "Will whitening change my fillings or crowns?", a: "No. Only natural tooth enamel lightens, which is why we check your teeth first." },
      { q: "How white will my teeth go?", a: "Results vary from person to person. Your dentist will give you a realistic idea at the first visit." },
    ],
    related: ["hygiene-clean", "composite-bonding", "aligner-consultation"],
  },

  "composite-bonding": {
    benefit: "Reshape chips, gaps and uneven edges in a single visit.",
    whatItIs: [
      "Composite bonding adds tooth-coloured resin to the surface of a tooth, sculpted by hand to improve its shape. In most cases no drilling or injections are needed.",
      "It is priced per tooth, and the price depends on the clinician you choose.",
    ],
    whoItIsFor: [
      "Small chips and worn edges",
      "Gaps between front teeth",
      "Teeth that are slightly uneven in length or shape",
    ],
    steps: [
      { title: "Design conversation", text: "We agree the shape and shade, often with a quick mock-up." },
      { title: "Prepare the surface", text: "The tooth is gently cleaned so the resin bonds well." },
      { title: "Sculpt", text: "Composite is layered and shaped by hand, then set with a light." },
      { title: "Polish", text: "A high polish gives a natural, enamel-like finish." },
    ],
    aftercare: [
      "Avoid biting nails, pens or very hard foods on bonded teeth.",
      "Bonding can pick up stains. Regular hygiene visits keep it bright.",
      "Bonding can be repaired or refreshed if it chips.",
    ],
    faqs: [
      { q: "How long does bonding last?", a: "Typically several years with good care. It can be polished or repaired when needed." },
      { q: "Should I whiten first?", a: "Often yes, because composite is matched to your tooth shade on the day." },
    ],
    related: ["teeth-whitening", "aligner-consultation", "white-filling"],
  },

  "aligner-consultation": {
    benefit: "See a 3D preview of your straighter smile before you commit.",
    whatItIs: [
      "A consultation with our orthodontic specialist to find out whether clear aligners are right for you. We take a 3D scan and show you a simulated result on screen.",
      "You receive a written plan with the expected length of treatment and the full cost.",
    ],
    whoItIsFor: [
      "Adults and older teens with crowded or gappy teeth",
      "People whose teeth have moved since earlier braces",
      "Anyone who wants a discreet alternative to fixed braces",
    ],
    steps: [
      { title: "Discuss your goals", text: "What you would like to change, and what matters most to you." },
      { title: "3D scan", text: "A quick, comfortable scan. No putty impressions." },
      { title: "Preview", text: "See a simulation of your predicted result on screen." },
      { title: "Plan and costs", text: "A written plan with timings, price and finance options." },
    ],
    aftercare: [
      "There is nothing to recover from. Take your plan home and think it over.",
      "If you go ahead, your first aligners usually arrive within a few weeks.",
      "Questions afterwards are welcome by phone or email.",
    ],
    faqs: [
      { q: "How long does aligner treatment take?", a: "It varies with the amount of movement needed. Your plan will give you a personal estimate." },
      { q: "Am I committed after the consultation?", a: "Not at all. The consultation is there to help you decide." },
    ],
    related: ["teeth-whitening", "composite-bonding", "new-patient-exam"],
  },

  "dental-implant": {
    benefit: "A fixed, natural-looking replacement for a missing tooth.",
    whatItIs: [
      "A dental implant is a small titanium post placed in the jaw to act as a root. Once healed, a custom crown is attached to it.",
      "Our price includes the implant, the connecting abutment and the final crown.",
    ],
    whoItIsFor: [
      "Adults with one missing tooth and healthy gums",
      "People who would like to avoid a bridge or denture",
      "Patients with a failing tooth that cannot be saved",
    ],
    steps: [
      { title: "Assessment and 3D imaging", text: "We check bone and gum health and plan the position digitally." },
      { title: "Implant placement", text: "The implant is placed under local anaesthetic." },
      { title: "Healing", text: "The implant integrates with the bone over a few months." },
      { title: "Scan for your crown", text: "A digital scan is used to design the final tooth." },
      { title: "Fit", text: "Your crown is attached and the bite is checked." },
    ],
    aftercare: [
      "Expect some swelling and tenderness for a few days after placement.",
      "Follow the written care instructions we give you on the day.",
      "Clean around the implant daily and attend regular hygiene visits.",
    ],
    faqs: [
      { q: "Does having an implant hurt?", a: "The area is fully numbed. Most patients describe it as easier than they expected." },
      { q: "Can I pay monthly?", a: "Yes. Implants are eligible for 0% finance over 6 to 24 months, subject to status." },
    ],
    related: ["crown", "new-patient-exam", "hygiene-clean"],
  },

  emergency: {
    benefit: "Seen the same day, out of pain, with a clear plan for what comes next.",
    whatItIs: [
      "An urgent appointment to assess the problem, relieve pain and stabilise the tooth. We hold slots back every day for emergencies.",
      "The fee covers assessment, any X-rays needed and immediate pain relief. Further treatment is quoted before it starts.",
    ],
    whoItIsFor: [
      "Severe or worsening toothache",
      "A broken, chipped or knocked-out tooth",
      "Swelling, a lost filling or a loose crown",
    ],
    steps: [
      { title: "Book or call", text: "Choose a same-day slot online, or call and we will fit you in." },
      { title: "Assessment", text: "We find the cause, with an X-ray if needed." },
      { title: "Relief", text: "We deal with the pain and stabilise the tooth." },
      { title: "Next steps", text: "You leave with a clear plan and prices for any further care." },
    ],
    aftercare: [
      "Follow the advice your dentist gives you on the day.",
      "Book any follow-up treatment online at a time that suits you.",
      "If swelling affects your breathing or swallowing, call 999.",
    ],
    faqs: [
      { q: "Do I need to be registered with you?", a: "No. We see new and existing patients for emergencies." },
      { q: "What if it is out of hours?", a: "Call NHS 111 for urgent advice. If swelling affects breathing or swallowing, call 999." },
    ],
    related: ["root-canal-front", "white-filling", "new-patient-exam"],
  },
};
