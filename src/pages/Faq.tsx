import data from "@/data/faq.json";
import Accordion from "react-bootstrap/Accordion";
import Layout from "@/components/layouts/Layout";
import { env } from "@/config/env";
import SEO from "@/components/SEO";
import { generateFAQSchema } from "@/utils/seo-schemas";
import PageHeader from "@/components/layouts/PageHeader";

function Faq() {
  const faqSchema = generateFAQSchema(
    data.map((item) => ({
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
        canonical={`${env.APP_URL}/faq`}
        structuredData={[faqSchema]}
      />

      <div className="container">
        <PageHeader title="FAQ" />

        <Accordion defaultActiveKey="0" className="faqs-accordion">
          {data.map((item, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}

export default Faq;
