import Layout from "../components/Layout";
import "antd/dist/antd.css";

export default function App({Component, ...props}) {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}