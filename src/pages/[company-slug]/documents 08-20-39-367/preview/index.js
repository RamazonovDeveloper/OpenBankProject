// ** Demo Components Imports
import { useEffect, useState } from 'react'
import Preview from 'src/views/apps/payments/preview/Preview'
import { useCompany } from 'src/hooks/useCompany'
import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
import usePayment from 'src/hooks/usePayment'
import useEimzo from 'src/hooks/useEimzo'
import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { Card, CardContent, Grid, Tab, Typography } from '@mui/material'
import useDocumentsFilter from 'src/hooks/useDocuments'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import DocumentsCreditItem from '../creditItem'
import PaymentDocumentsItem from '../paymentDocuments'
import InsuranceContractsOfDocuments from '../insuranceContracts'

const InvoicePreviewDocuments = (props) => {

  const { documentsList, pdfFiles, singleDocument, getDocumentsByItsId, getDocumentsByItsIdPDFFiles } = useDocumentsFilter()

  const { paymentId } = props

  useEffect(() => {
    getDocumentsByItsId(paymentId)
    getDocumentsByItsIdPDFFiles(paymentId)
  }, []);


const handleChange = (event, newValue) => {
    // setTabValue(newValue);
};


console.log("17 17 17 17 17 SINGLE DOCUMENT Document id inside of the Document by id js", singleDocument);


const [value, setTabValue] = useState('1')

useEffect(() => {
    console.log("17 17 17 17 17 SINGLE DOCUMENT Document id inside of the Document by id js", String(singleDocument.type));

    const stringValue = String(singleDocument.type)
    
    setTabValue(stringValue)

}, [singleDocument]);

// const [value, setValue] = useState(tabValue);

  return paymentId ? (
<Grid>
    <Box>
      <TabContext value={value}>
        <Box className="my_tab_list_tabcontext">
          <Card className='my_tab_list_accounts_page'>
            <TabList  className='my_tab_list_accounts_page_list' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
              <Tab className={value == 1 ? 'active_tab tab_item' : "tab_item"} label="Кредитные документы" value="1" />
              <Tab className={value == 2 ? 'active_tab tab_item' : 'tab_item'} label="Договоры страхования" value="2" />
              <Tab className={value == 3 ? 'active_tab tab_item' : "tab_item"} label="Платежные документы" value="3" />
            </TabList>
          </Card>
        </Box>

          
        
        <TabPanel className='account_tab_panel' value="1">
            <DocumentsCreditItem props={paymentId}/>
        </TabPanel>
        <TabPanel className='account_tab_panel' value="2">
            <InsuranceContractsOfDocuments props={paymentId}/>
        </TabPanel> 
        <TabPanel className='account_tab_panel' value="3">
            <PaymentDocumentsItem props={paymentId} />
        </TabPanel> 
      </TabContext>
    </Box>
</Grid>
  ) : (
    <Box>Загрузка..</Box>
  )
}

export async function getServerSideProps(context) {
  const paymentId = context.query.id

  // const {company, token} = useCompany()
  // let data = await PaymentRepository.getPaymentById(paymentId)

  return {
    props: {
      paymentId: context.query.id
    
      // paymentData: data
    } // will be passed to the page component as props
  }
}

export default InvoicePreviewDocuments





// console.log("CCCCCCCCC documentPreview PROPS", props);
    
//   const [value, setValue] = useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//     return
//     <Grid>
//     <Box>
//       <TabContext value={value}>
//         <Box className="my_tab_list_tabcontext">
//           <Card className='my_tab_list_accounts_page'>
//             <TabList  className='my_tab_list_accounts_page_list' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
//               <Tab className={value == 1 ? 'active_tab tab_item' : "tab_item"} label="Кредитные документы" value="1" />
//               <Tab className={value == 2 ? 'active_tab tab_item' : 'tab_item'} label="Договоры страхования" value="2" />
//               <Tab className={value == 3 ? 'active_tab tab_item' : "tab_item"} label="Платежные документы" value="3" />
//             </TabList>
//           </Card>
//         </Box>

          
        
//         <TabPanel className='account_tab_panel' value="1">
          
//         </TabPanel>
//         <TabPanel className='account_tab_panel' value="2">
          
//         </TabPanel> 
//         <TabPanel className='account_tab_panel' value="3">
          
//         </TabPanel> 
//       </TabContext>
//     </Box>
// </Grid>