import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import Link from 'next/link';
import RandomCallsign from './random_callsign';

export const metadata: Metadata = {
  title: 'Amateur Radio Certificate',
  description: 'About Amateur Radio Callsign Certificate',
  openGraph: {
    title: 'Amateur Radio Certificate',
    description: 'About Amateur Radio Callsign Certificate',
  },
};

export default function License() {
  return (
    <>
      <SubHeader>
        <h1>
          Amateur Radio Operator Certificate
          <br />
          (Canadian License)
        </h1>
        <p>
          Your amateur radio callsign is issued by{' '}
          <Link target="_blank" href="https://ised-isde.canada.ca">
            Innovation, Science and Economic Development Canada
            (ISED)
          </Link>
          .
        </p>
        <p>
          This license allows you to operate in Canada and some foreign countries holding agreements with Canada (CEPT/IARP).        .
        </p>
      </SubHeader>

      <div className="section container prose">
        <h2>Callsign</h2>
        <p>
          Callsign attribution in Canada is described as per <strong>RIC-9:</strong>{' '}
          <Link
            target="_blank"
            href="https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/licences-and-certificates/radiocom-information-circulars-ric/ric-9-call-sign-policy-and-special-event-prefixes"
          >
            Call Sign Policy and Special Event Prefixes
          </Link>
          .
        </p>
        <p>
          An amateur radio callsign is composed of:
        </p>
        <ul>
          <li>A prefix depending on the province:</li>
          <table class="table table-hover table-bordered small"><caption class="bg-primary">Prefixes currently used for assignment</caption>
            <tbody>
              <tr>  
                <th id="un_1">Prefix </th>  <th id="un_2">Province/Territory</th> 
              </tr>   
              <tr>      
                <td headers="un_1">VE1 VA1</td>      
                <td headers="un_2">Nova Scotia</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE2 VA2</td>      
                <td headers="un_2">Quebec</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE3 VA3</td>      
                <td headers="un_2">Ontario</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE4 VA4</td>      
                <td headers="un_2">Manitoba</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE5 VA5</td>      
                <td headers="un_2">Saskatchewan</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE6 VA6</td>      
                <td headers="un_2">Alberta</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE7 VA7</td>      
                <td headers="un_2">British Columbia</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE8</td>      
                <td headers="un_2">Northwest Territories</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE9</td>      
                <td headers="un_2">New Brunswick</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VE0*</td>      
                <td headers="un_2">International Waters</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VO1</td>      
                <td headers="un_2">Newfoundland</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VO2</td>      
                <td headers="un_2">Labrador</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VY1</td>      
                <td headers="un_2">Yukon Territory</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VY2</td>      
                <td headers="un_2">Prince Edward Island</td>   
              </tr>   
              <tr>      
                <td headers="un_1">VY0</td>      
                <td headers="un_2">Nunavut Territory</td>   
              </tr>
            </tbody>
          </table>
          <li>a suffix, with 2 or 3 letters. 2 letter suffix is subject to a fee.</li>
        </ul>

        <RandomCallsign />

        <h3>Callsign search</h3>
        <p>
          You can search for available callsigns at{' '}
          <Link
            target="_blank"
            href="https://apc-cap.ic.gc.ca/pls/apc_anon/query_amat_cs$.startup"
          >
            ISED Amateur Callsign Search
          </Link>
          .
        </p>
        <p>
          You can choose your callsign prefix depending on your province. 3-letter suffix is customizable.
        </p>

        <Link href="/klicni-znak" className="button w-full">
          Amateur Radio Callsign Helper
        </Link>
      </div>

      <div className="flex bg-light">
        <div className="section container prose">
          <h2>License Permit</h2>
          <p>
            Once requested, your license will be transmitted via postal mail to your Canadian address.
          </p>
          <p>
            As long as the prefix matches your province along with a custom suffix is available, it will be automatically assigned to you.
          </p>
          <p>
            You can also request a 2-letter suffix, but along with a fee.
          </p>
          <p>
            You can also request a sequential callsign the ISED will choose for you.
          </p>
        </div>
      </div>
    </>
  );
}
