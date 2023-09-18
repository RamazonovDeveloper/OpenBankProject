// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Preview from 'src/views/apps/credits/preview/Preview'

const InvoicePreview = ({ id }) => {
  return <Preview id={id} />
}

// export const getStaticPaths = async () => {

//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: false
//   }
// }

// export const getStaticProps = ({ params }) => {
//   return {
//     props: {
//       id: params?.id
//     }
//   }
// }

export default InvoicePreview
