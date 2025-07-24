import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Spare Parts Manager">
    <h1>Welcome 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
);

export default IndexPage;
