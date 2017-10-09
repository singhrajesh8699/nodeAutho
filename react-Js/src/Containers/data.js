import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import {cyan600, pink600, purple600,white} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    { 
      text: 'Home',
      icon: <Assessment color="white"/>,
      children: [
        { text: 'SalesForce', link: '/home' },
       ]
    },
    { 
      text: 'SalesForce',
      icon: <Assessment color="white"/>,
      children: [
        { text: 'SalesForce', link: '/salesforce' },
       ]
    },
    { 
      text: 'S3',
      icon: <Web color="white"/>,
      children: [
        { text: 'Pull form S3', link: '/s3' },
      ]
    },
    { 
      text: 'Eloqua',
      icon: <PermIdentity color="white"/>,
      children: [
        { text: 'Pull from Eloqua', link: '/eloqua' },
      ]
    }
  ]
};

export default data;
