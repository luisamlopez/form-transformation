import { useState } from 'react';
import './App.css';
import { CopyBlock, dracula } from "react-code-blocks";
import copy from 'copy-to-clipboard';

function App() {
  const [id, setId] = useState();
  const [url, setURL] = useState();
  const [applied, setApplied] = useState(false);
  //checkboxes states
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);


  const code = `<div id="${id}"></div>
<script type="text/javascript">(function () {
    try {
        var f = document.createElement("iframe");

        var url = window.location.href;
        var sourceParam = (url.includes('?')) ? new URL(url).searchParams.get("source") : "";
        var aff_idParam = (url.includes('?')) ? new URL(url).searchParams.get("aff_id") : "";
       ${phone ? `var phoneParam = (url.includes('?')) ? new URL(url).searchParams.get("phone") : "";` : ``}
        ${email ? `var emailParam = (url.includes('?')) ? new URL(url).searchParams.get("email") : "";` : ``}
        ${firstname ? `var nameParam = (url.includes('?')) ? new URL(url).searchParams.get("firstname") : "";` : ``}
        ${lastname ? `var lastNameParam = (url.includes('?')) ? new URL(url).searchParams.get("lastname") : "";` : ``}

        // Check if the parameters are null and set them to an empty string if they are
        sourceParam = sourceParam === null ? "" : sourceParam;
        aff_idParam = aff_idParam === null ? "" : aff_idParam;
        ${phone ? `phoneParam = phoneParam === null ? "" : phoneParam;` : ``}
        ${email ? `emailParam = emailParam === null ? "" : emailParam;` : ``}
        ${firstname ? `nameParam = nameParam === null ? "" : nameParam;` : ``}
        ${lastname ? `lastNameParam = lastNameParam === null ? "" : lastNameParam;` : ``}
        

        var zohoURL = "${url}";

        // New URL with the parameters depending on the checkboxes 
         f.src = \`\${zohoURL}?source=\${sourceParam}&aff_id=\${aff_idParam}${phone ? '&phone=\${phoneParam}' : ''}${email ? '&email=\${emailParam}' : ''}${firstname ? '&firstname=\${nameParam}' : ''}${lastname ? '&lastname=\${lastNameParam}' : ''}&zf_rszfm=1\`;
    
       
        // Same styles as previous
        f.style.border = "none";
        f.style.height = "510px";
        f.style.width = "100%";
        f.style.transition = "all 0.5s ease";

        var d = document.getElementById("${id}");
        d.appendChild(f);
        window.addEventListener('message', function () {
            var evntData = event.data;
            if (evntData && evntData.constructor == String) {
                var zf_ifrm_data = evntData.split("|");
                if (zf_ifrm_data.length == 2) {
                    var zf_perma = zf_ifrm_data[0];
                    var zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
                    var iframe = document.getElementById("${id}").getElementsByTagName("iframe")[0];
                    if ((iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0) {
                        var prevIframeHeight = iframe.style.height;
                        if (prevIframeHeight != zf_ifrm_ht_nw) {
                            iframe.style.height = zf_ifrm_ht_nw;
                        }
                    }
                }
            }
        }, false);
    } catch (e) { }
})();</script>`;

  const applyChanges = (e) => {
    e.preventDefault();
    setApplied(true);
  }

  const restart = (e) => {
    e.preventDefault();
    setId("");
    setURL("");
    setEmail(false);
    setPhone(false);
    setFirstname(false);
    setLastname(false);
    setApplied(false);
  }


  return (
    <div className="App">
      <h1>
        Form Builder
      </h1>
      <form method='POST'>
        <button onClick={restart}>
          Restart
        </button>
        <div className='holder'>
          <label>
            ID
          </label>
          <input type='text' name='id' value={id} onChange={(e) => {
            setId(e.target.value)
          }}
            required />
        </div>
        <div className='holder'>
          <label>
            Zoho URL
          </label>
          <input type='text' name='url' value={url} onChange={(e) => {
            // Transform the URL and only get the text before the ? 
            var parts = e.target.value.split("?");
            var textBeforeQuestionMark = parts[0];
            setURL(textBeforeQuestionMark);
          }}
            required />
        </div>

        <div className='options'>
          <p>Choose what parameters you need to pick: </p>

          <div className='checkbox'>
            <input type='checkbox' name='phone' onChange={(e) => {
              setPhone(e.target.checked)
            }} checked={phone} />
            <label>
              Phone
            </label>
          </div>
          <div className='checkbox'>

            <input type='checkbox' name='email' onChange={(e) => {
              setEmail(e.target.checked)
            }} checked={email} />
            <label>
              Email
            </label>
          </div>
          <div className='checkbox'>

            <input type='checkbox' name='firstname' onChange={(e) => {
              setFirstname(e.target.checked)
            }} checked={firstname} />
            <label>
              Firstname
            </label>
          </div>
          <div className='checkbox'>
            <input type='checkbox' name='lastname' onChange={(e) => {
              setLastname(e.target.checked)
            }} checked={lastname} />
            <label>
              Lastname
            </label>
          </div>
        </div>

        <button onClick={applyChanges}>
          Apply changes
        </button>
      </form>


      {/* Changed code */}
      {applied && id && url && (
        <><h2>
          Transformed code
        </h2>

          <CopyBlock
            text={code}
            language={'javascript'}
            showLineNumbers={true}
            theme={dracula}
            codeBlock
            onCopy={() => copy(code)}
            //styles for the code block
            customStyle={{
              width: "98%",
              margin: "0 auto",
              overflow: "scroll",

            }}
          />
        </>

      )}
      {!applied && (
        <iframe src="https://scribehow.com/embed/Copying_and_Pasting_Text_into_Google_Docs_with_Script__c02Rvg39SCW7L1XzQ9RNCA?as=scrollable" width="100%" height="640" allowfullscreen frameborder="0"></iframe>
      )}
    </div>
  );
}


export default App;


