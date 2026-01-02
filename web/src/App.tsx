import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Business, BusinessRequest, UiOpenPayload } from './types';
import { useNuiEvent } from './hooks/useNuiEvent';
import { useKeyPress } from './hooks/useKeyPress';
import { fetchNui } from './utils/fetchNui';

import TabletFrame from './components/TabletFrame/TabletFrame';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Toast from './components/Toast/Toast';
import DevPanel from './components/DevPanel/DevPanel';

import Market from './pages/Market/Market';
import MyRequests from './pages/MyRequests/MyRequests';
import MyBusinesses from './pages/MyBusinesses/MyBusinesses';
import CreateRequest from './pages/CreateRequest/CreateRequest';
import StaffRequests from './pages/StaffRequests/StaffRequests';

type Page = 'market' | 'create' | 'myRequests' | 'myBusinesses' | 'staff';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [playerName, setPlayerName] = useState('Joueur');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [myRequests, setMyRequests] = useState<BusinessRequest[]>([]);
  const [myBusinesses, setMyBusinesses] = useState<Business[]>([]);
  const [staffRequests, setStaffRequests] = useState<BusinessRequest[]>([]);
  const [page, setPage] = useState<Page>('market');

  const [toasts, setToasts] = useState<any[]>([]);
  const pushToast = useCallback((t:any)=>{
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setToasts(p=>[...p,{id,...t}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)), 4500);
  },[]);

  const closeUi = useCallback(async ()=>{
    setVisible(false); setPage('market');
    await fetchNui('ui:close',{});
  },[]);

  useKeyPress(['Escape'], ()=>{ if(visible) closeUi(); }, visible);

  useNuiEvent('ui:open', (data: UiOpenPayload | undefined) => {
    if (!data) return;
    setIsStaff(data.isStaff);
    setPlayerName(data.playerName);
    setBusinesses(data.businesses ?? []);
    setMyRequests(data.myRequests ?? []);
    setMyBusinesses(data.myBusinesses ?? []);
    setStaffRequests(data.staffRequests ?? []);
    setVisible(true);
    setPage('market');
  });

  useNuiEvent('ui:close', ()=>{ setVisible(false); setPage('market'); });

  useNuiEvent('ui:updateBusinesses', (data) => {
    if (data?.businesses) setBusinesses(data.businesses);
  });

  useNuiEvent('ui:updateMyRequests', (data) => {
    if (data?.myRequests) setMyRequests(data.myRequests);
  });

  useNuiEvent('ui:updateMyBusinesses', (data) => {
    if (data?.myBusinesses) setMyBusinesses(data.myBusinesses);
  });

  useNuiEvent('ui:updateStaffRequests', (data) => {
    if (data?.staffRequests) setStaffRequests(data.staffRequests);
  });

  const sidebarItems = useMemo(()=>{
    const items: Array<{ id: string; label: string; icon: 'Store' | 'FilePlus2' | 'Inbox' | 'Briefcase' | 'Shield' }> = [
      { id: 'market', label: 'Marché', icon: 'Store' },
      { id: 'create', label: 'Créer une entreprise', icon: 'FilePlus2' },
      { id: 'myRequests', label: 'Mes demandes', icon: 'Inbox' },
      { id: 'myBusinesses', label: 'Mes entreprises', icon: 'Briefcase' },
    ];
    if(isStaff) items.push({ id: 'staff', label: 'STAFF', icon: 'Shield' });
    return items;
  },[isStaff]);
  return (
    <>
      <DevPanel />
      <AnimatePresence>
        {visible && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(14px)'}} />
            <TabletFrame onClose={closeUi}>
              <Header playerName={playerName} isStaff={isStaff} onClose={closeUi} onHome={()=>setPage('market')} />
              <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:16,height:'100%',overflow:'hidden'}}>
                <Sidebar items={sidebarItems} activeId={page} onSelect={(id)=>setPage(id as Page)} />
                <div style={{minWidth:0,height:'100%',overflowY:'auto',overflowX:'hidden'}}>
                  {page==='market' && (
                    <Market businesses={businesses} onOpenBusiness={()=>{}} pushToast={pushToast}
                      onRefresh={async ()=>{
                        const data = await fetchNui<{businesses:Business[]}>('getBusinesses',{}, {businesses});
                        if(data?.businesses) setBusinesses(data.businesses);
                      }}
                    />
                  )}
                  {page==='myRequests' && (
                    <MyRequests requests={myRequests} onOpenRequest={()=>{}} pushToast={pushToast}
                      onRefresh={async ()=>{
                        const data = await fetchNui<{myRequests:BusinessRequest[]}>('getMyRequests',{}, {myRequests});
                        if(data?.myRequests) setMyRequests(data.myRequests);
                      }}
                    />
                  )}
                  {page==='myBusinesses' && (
                    <MyBusinesses businesses={myBusinesses} onOpenBusiness={()=>{}} pushToast={pushToast}
                      onRefresh={async ()=>{
                        const data = await fetchNui<{myBusinesses:Business[]}>('getMyBusinesses',{}, {myBusinesses});
                        if(data?.myBusinesses) setMyBusinesses(data.myBusinesses);
                      }}
                    />
                  )}
                  {page==='create' && (
                    <CreateRequest pushToast={pushToast} onSuccess={async ()=>{
                      const data = await fetchNui<{myRequests:BusinessRequest[]}>('getMyRequests',{}, {myRequests});
                      if(data?.myRequests) setMyRequests(data.myRequests);
                      setPage('myRequests');
                    }} />
                  )}
                  {page==='staff' && isStaff && (
                    <StaffRequests requests={staffRequests} onOpenRequest={()=>{}} pushToast={pushToast}
                      onRefresh={async ()=>{
                        const data = await fetchNui<{staffRequests:BusinessRequest[]}>('getStaffRequests',{}, {staffRequests});
                        if(data?.staffRequests) setStaffRequests(data.staffRequests);
                      }}
                    />
                  )}
                </div>
              </div>
            </TabletFrame>
            <Toast items={toasts} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
