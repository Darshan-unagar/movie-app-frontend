import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    // Create a function to inject ad scripts
    const loadScript = (src, async = true) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = async;
      document.body.appendChild(script);
    };

    const loadInlineScript = (code) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = code;
      document.body.appendChild(script);
    };

    // Inject all the scripts one by one
    loadInlineScript(`
      atOptions = {
        'key' : 'f2a53acd9d357833ddceb1f12da5569b',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `);
    loadScript("//www.topcreativeformat.com/f2a53acd9d357833ddceb1f12da5569b/invoke.js");

    loadInlineScript(`
      atOptions = {
        'key' : 'ce0dbe769c2bb5234495a9426ffd0f13',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `);
    loadScript("//www.topcreativeformat.com/ce0dbe769c2bb5234495a9426ffd0f13/invoke.js");

    loadInlineScript(`
      atOptions = {
        'key' : 'cada2848ae1d842ec6a04affe9af52ce',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `);
    loadScript("//www.topcreativeformat.com/cada2848ae1d842ec6a04affe9af52ce/invoke.js");

    loadInlineScript(`
      atOptions = {
        'key' : 'd748e986155c3e1a51e582094300f910',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `);
    loadScript("//www.topcreativeformat.com/d748e986155c3e1a51e582094300f910/invoke.js");

    // Add additional scripts as plain JS
    loadScript("//pl24272245.cpmrevenuegate.com/2d/ca/41/2dca41e5d63bfce0b408155af3fe9da7.js");
    loadScript("//pl24272250.cpmrevenuegate.com/d1/4a/04/d14a04c27ccfbfb72ac8f7713c3c895b.js");
    loadScript("//pl24272333.cpmrevenuegate.com/b4cc652a80dc8ba52abad603439a4aa5/invoke.js");

  }, []); // The empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <div id="container-b4cc652a80dc8ba52abad603439a4aa5"></div>
    </div>
  );
};

export default AdComponent;
