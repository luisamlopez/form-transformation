import { useState } from 'react';
import './App.css';
import { CopyBlock, dracula } from "react-code-blocks";
import copy from 'copy-to-clipboard';

function App() {
  const [id, setId] = useState();
  const [url, setURL] = useState();
  const [applied, setApplied] = useState(false);


  const code = `<div id="${id}"></div>
<script type="text/javascript">(function () {
    try {
        var f = document.createElement("iframe");

        var url = window.location.href;
        var sourceParam = (url.includes('?')) ? new URL(url).searchParams.get("source") : "";
        var aff_idParam = (url.includes('?')) ? new URL(url).searchParams.get("aff_id") : "";
        var phoneParam = (url.includes('?')) ? new URL(url).searchParams.get("phone") : "";
        var emailParam = (url.includes('?')) ? new URL(url).searchParams.get("email") : "";
        var nameParam = (url.includes('?')) ? new URL(url).searchParams.get("firstname") : "";
        var lastNameParam = (url.includes('?')) ? new URL(url).searchParams.get("lastname") : "";

        // Check if the parameters are null and set them to an empty string if they are
        sourceParam = sourceParam === null ? "" : sourceParam;
        aff_idParam = aff_idParam === null ? "" : aff_idParam;
        phoneParam = phoneParam === null ? "" : phoneParam;
        emailParam = emailParam === null ? "" : emailParam;
        nameParam = nameParam === null ? "" : nameParam;
        lastNameParam = lastNameParam === null ? "" : lastNameParam;

        var zohoURL = "${url}";

        f.src = \`\${zohoURL}?source=\${sourceParam}&aff_id=\${aff_idParam}&phone=\${phoneParam}&email=\${emailParam}&firstname=\${nameParam}&lastname=\${lastNameParam}&zf_rszfm=1\`;

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
    setApplied(false);
  }


  return (
    <div className="App">
      <h1>
        Form Transformation
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
            wrapLines={true}
            theme={dracula}
            codeBlock
            onCopy={() => copy(code)}

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


