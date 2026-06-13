import Accordion from "react-bootstrap/Accordion";
import Layout from "@/components/layouts/layout";
import { env } from "@/config/env";
import SEO from "@/components/seo";
import { generateFAQSchema } from "@/utils/seo-schemas";
import PageHeader from "@/components/layouts/page-header";
import { faqs } from "@/data/faqs";

const Faq = () => {
  const faqSchema = generateFAQSchema(
    faqs.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <Layout>
      <SEO
        title="Pertanyaan Umum"
        description="Temukan jawaban untuk pertanyaan umum seputar JAF Parfum's, pengiriman, pembayaran, dan layanan kami."
        keywords="FAQ, pertanyaan umum, bantuan, customer service"
        canonical={`${env.APP_URL}/faqs`}
        structuredData={[faqSchema]}
      />

      <div className="container">
        <PageHeader title="FAQs" />

        <Accordion defaultActiveKey="0" className="faqs-accordion">
          {faqs.map((item, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default Faq;
