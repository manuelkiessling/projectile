<?php

/**
 * This sample app is provided to kickstart your experience using Facebook's
 * resources for developers.  This sample app provides examples of several
 * key concepts, including authentication, the Graph API, and FQL (Facebook
 * Query Language). Please visit the docs at 'developers.facebook.com/docs'
 * to learn more about the resources available to you
 */

// Provides access to app specific values such as your app id and app secret.
// Defined in 'AppInfo.php'
require_once('AppInfo.php');

// Enforce https on production
if (substr(AppInfo::getUrl(), 0, 8) != 'https://' && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
  exit();
}

// This provides access to helper functions defined in 'utils.php'
require_once('utils.php');


/*****************************************************************************
 *
 * The content below provides examples of how to fetch Facebook data using the
 * Graph API and FQL.  It uses the helper functions defined in 'utils.php' to
 * do so.  You should change this section so that it prepares all of the
 * information that you want to display to the user.
 *
 ****************************************************************************/

require_once('sdk/src/facebook.php');

$facebook = new Facebook(array(
  'appId'  => AppInfo::appID(),
  'secret' => AppInfo::appSecret(),
));

$user_id = $facebook->getUser();
if ($user_id) {
  try {
    // Fetch the viewer's basic information
    $basic = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    // If the call fails we check if we still have a user. The user will be
    // cleared if the error is because of an invalid accesstoken
    if (!$facebook->getUser()) {
      header('Location: '. AppInfo::getUrl($_SERVER['REQUEST_URI']));
      exit();
    }
  }

  // This fetches some things that you like . 'limit=*" only returns * values.
  // To see the format of the data you are retrieving, use the "Graph API
  // Explorer" which is at https://developers.facebook.com/tools/explorer/
  $likes = idx($facebook->api('/me/likes?limit=4'), 'data', array());

  // This fetches 4 of your friends.
  $friends = idx($facebook->api('/me/friends?limit=4'), 'data', array());

  // And this returns 16 of your photos.
  $photos = idx($facebook->api('/me/photos?limit=16'), 'data', array());

  // Here is an example of a FQL call that fetches all of your friends that are
  // using this app
  $app_using_friends = $facebook->api(array(
    'method' => 'fql.query',
    'query' => 'SELECT uid, name FROM user WHERE uid IN(SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user = 1'
  ));
}

// Fetch the basic info of the app that they are using
$app_info = $facebook->api('/'. AppInfo::appID());

$app_name = idx($app_info, 'name', '');

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>projectile » Open Source HTML5 space shooter</title>
    <meta name="description" content="projectile is a 2D space shooter playable in your browser, written in JavaScript using Canvas" />
    <style type="text/css">
      html, body, canvas {
        padding: 0;
      }
      body {
        background-color: #000;
        background-image: url('assets/images/background.png');
        background-repeat: no-repeat;
        background-size: 100%;
      }
      #loadscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
      }
      #loadscreen-inner {
        width: 960px;
        margin: 0 auto;
        margin-top: 300px;
        font-family: "Courier New", Courier, sans-serif;
        font-size: 36pt;
        font-weight: bolder;
        color: #fff;
        text-align: center;
      }
      #loadbar {
        display: inline-block;
        background-color: #0f0;
        width: 0;
      }
      #worldbox {
        width: 960px;
        height: 640px;
        margin: 0 auto;
        padding: 0;
        border: 1px solid black;
        background-color: black;
      }
      #help {
        width: 960px;
        margin: 0 auto;
        text-align: center;
        font-family: Arial, Verdana, sans-serif;
        color: #999;
      }
      #webglnote {
        color: #555;
      }
      #stats {
        width: 960px;
        margin: 0 auto;
        font-family: "Courier New", Courier;
        font-weight: bolder;
        font-size: 12pt;
        text-align: center;
        color: #99ff00;
      }
    </style>
  </head>
  <body>
    <a href="https://github.com/ManuelKiessling/projectile"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://a248.e.akamai.net/assets.github.com/img/abad93f42020b733148435e2cd92ce15c542d320/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub"></a>
    <div id="loadscreen">
      <div id="loadscreen-inner">
        Loading, please wait...
        <br/>
        <span id="loadbar">&nbsp;</span>
      </div>
    </div>

    <div id="stats">
      Time: <span id="time">60</span> seconds -
      Score: <span id="hits">0</span>
    </div>

    <div id="worldbox">
      <canvas id="world" width="960" height="640">
        This browser can not run this game (canvas support missing).
      </canvas>
    </div>

    <div id="help">
      Use arrow keys to move, space to shoot.
      <span id="webglnote"></span>
    </div>

    <canvas id="bufferWorld" width="960" height="7560" style="display: none;">
      This browser can not run this game (canvas support missing).
    </canvas>

    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-2127388-10']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
    <script data-main="./scripts/app/game" src="./scripts/vendor/require-jquery.min.js"></script>
  </body>
</html>
