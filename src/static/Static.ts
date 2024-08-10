// export const base_url = process.env.REACT_APP_CLIENT_URL
// import p2 from "../assets/venuprofile.jpg"

export interface Users {
  message: string;
  time: string;
  unreadCount?: number;
}
export interface ReceiveColors {
  [key: string]: string;
};
{/* <section className={`${isCurrentLoading === true ? "block shadow-lg bg-black bg-opacity-70 w-full h-full m-auto" : "hidden"} cursor-pointer group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center`}>
            {
              isCurrentLoading &&
              <RingLoader
                color="#36d7b7"
                loading={isCurrentLoading}
                aria-label="Loading Spinner"
                speedMultiplier={1}
                data-testid="loader"
                size={500}
                className='m-auto'
              />
            }

          </section> */}
export const backgroundImages = ["https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/01/full/1680325748-8096.jpg",
  "https://images.indianexpress.com/2023/10/whatsapp-logo-featured-express.jpg",
  "https://miro.medium.com/v2/resize:fit:720/format:webp/0*EnfvGEllIYzq6As9",
  "https://cdn.pixabay.com/photo/2021/05/24/17/07/whatsapp-6279868_1280.png",
  "https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/03/webwhatsapp.jpg",
  "https://cdn.pixabay.com/photo/2016/04/27/20/39/whatsapp-1357489_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/21/08/44/whatsapp-1844471_1280.png",
  "https://images.unsplash.com/photo-1636751364472-12bfad09b451?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

export const Dummy = [
  {
    sender: "local",
    content: "message 1"
  }, {
    sender: "local",
    content: "message 2 dofh suio hfous fius yfiusf"
  }, {
    sender: "remote",
    content: "message 3"
  }, {
    sender: "local",
    content: "message 1"
  }, {
    sender: "remote",
    content: "message 2 sfsuyf uiwf ouwey f98wey f98wefouweoufhsdoufh9uwyf9we y9898w 9s8f 9usf9u s9uf ha"
  }, {
    sender: "remote",
    content: "message 3 sf oiuosf iweouwe 9ywe9u mwpeoum9ywn9yn9rn3q-987c98nq9enc9nr09wn9rw9ncr9ncn    9w r9nw9rn9w7nry97wynr7"
  },
  {
    sender: "local",
    content: "message 1"
  }, {
    sender: "local",
    content: "message 2 dofh suio hfous fius yfiusf"
  }, {
    sender: "remote",
    content: "message 3"
  }, {
    sender: "local",
    content: "message 1"
  }, {
    sender: "remote",
    content: "message 2 sfsuyf uiwf ouwey f98wey f98wefouweoufhsdoufh9uwyf9we y9898w 9s8f 9usf9u s9uf ha"
  }, {
    sender: "remote",
    content: "message 3 sf oiuosf iweouwe 9ywe9u mwpeoum9ywn9yn9rn3q-987c98nq9enc9nr09wn9rw9ncr9ncn    9w r9nw9rn9w7nry97wynr7"
  },
  {
    sender: "local",
    content: "message 1"
  }, {
    sender: "local",
    content: "message 2 dofh suio hfous fius yfiusf"
  }, {
    sender: "remote",
    content: "message 3"
  }, {
    sender: "local",
    content: "message 1"
  }, {
    sender: "remote",
    content: "message 2 sfsuyf uiwf ouwey f98wey f98wefouweoufhsdoufh9uwyf9we y9898w 9s8f 9usf9u s9uf ha"
  }, {
    sender: "remote",
    content: "message 3 sf oiuosf iweouwe 9ywe9u mwpeoum9ywn9yn9rn3q-987c98nq9enc9nr09wn9rw9ncr9ncn    9w r9nw9rn9w7nry97wynr7"
  },
  {
    sender: "local",
    content: "message 1"
  }, {
    sender: "local",
    content: "message 2 dofh suio hfous fius yfiusf"
  }, {
    sender: "remote",
    content: "message 3"
  }, {
    sender: "local",
    content: "message 1"
  }, {
    sender: "remote",
    content: "message 2 sfsuyf uiwf ouwey f98wey f98wefouweoufhsdoufh9uwyf9we y9898w 9s8f 9usf9u s9uf ha"
  }, {
    sender: "remote",
    content: "message 3 sf oiuosf iweouwe 9ywe9u mwpeoum9ywn9yn9rn3q-987c98nq9enc9nr09wn9rw9ncr9ncn    9w r9nw9rn9w7nry97wynr7"
  },

]

const additionalStuns = [
  { urls: 'stun:s1.taraba.net:3478' },
  { urls: 'stun:numb.viagenie.ca:3478' },
  { urls: 'stun:s2.taraba.net:3478' },
  { urls: 'stun:stun.12connect.com:3478' },
  { urls: 'stun:stun.12voip.com:3478' },
  { urls: 'stun:stun.1und1.de:3478' },
  { urls: 'stun:stun.2talk.co.nz:3478' },
  { urls: 'stun:stun.2talk.com:3478' },
  { urls: 'stun:stun.3clogic.com:3478' },
  { urls: 'stun:stun.3cx.com:3478' },
  { urls: 'stun:stun.a-mm.tv:3478' },
  { urls: 'stun:stun.aa.net.uk:3478' },
  { urls: 'stun:stun.acrobits.cz:3478' },
  { urls: 'stun:stun.actionvoip.com:3478' },
  { urls: 'stun:stun.advfn.com:3478' },
  { urls: 'stun:stun.aeta-audio.com:3478' },
  { urls: 'stun:stun.aeta.com:3478' },
  { urls: 'stun:stun.alltel.com.au:3478' },
  { urls: 'stun:stun.altar.com.pl:3478' },
  { urls: 'stun:stun.annatel.net:3478' },
  { urls: 'stun:stun.antisip.com:3478' },
  { urls: 'stun:stun.arbuz.ru:3478' },
  { urls: 'stun:stun.avigora.com:3478' },
  { urls: 'stun:stun.avigora.fr:3478' },
  { urls: 'stun:stun.awa-shima.com:3478' },
  { urls: 'stun:stun.awt.be:3478' },
  { urls: 'stun:stun.b2b2c.ca:3478' },
  { urls: 'stun:stun.bahnhof.net:3478' },
  { urls: 'stun:stun.barracuda.com:3478' },
  { urls: 'stun:stun.bluesip.net:3478' },
  { urls: 'stun:stun.bmwgs.cz:3478' },
  { urls: 'stun:stun.botonakis.com:3478' },
  { urls: 'stun:stun.budgetphone.nl:3478' },
  { urls: 'stun:stun.budgetsip.com:3478' },
  { urls: 'stun:stun.cablenet-as.net:3478' },
  { urls: 'stun:stun.callromania.ro:3478' },
  { urls: 'stun:stun.callwithus.com:3478' },
  { urls: 'stun:stun.cbsys.net:3478' },
  { urls: 'stun:stun.chathelp.ru:3478' },
  { urls: 'stun:stun.cheapvoip.com:3478' },
  { urls: 'stun:stun.ciktel.com:3478' },
  { urls: 'stun:stun.cloopen.com:3478' },
  { urls: 'stun:stun.colouredlines.com.au:3478' },
  { urls: 'stun:stun.comfi.com:3478' },
  { urls: 'stun:stun.commpeak.com:3478' },
  { urls: 'stun:stun.comtube.com:3478' },
  { urls: 'stun:stun.comtube.ru:3478' },
  { urls: 'stun:stun.cope.es:3478' },
  { urls: 'stun:stun.counterpath.com:3478' },
  { urls: 'stun:stun.counterpath.net:3478' },
  { urls: 'stun:stun.cryptonit.net:3478' },
  { urls: 'stun:stun.darioflaccovio.it:3478' },
  { urls: 'stun:stun.datamanagement.it:3478' },
  { urls: 'stun:stun.dcalling.de:3478' },
  { urls: 'stun:stun.decanet.fr:3478' },
  { urls: 'stun:stun.demos.ru:3478' },
  { urls: 'stun:stun.develz.org:3478' },
  { urls: 'stun:stun.dingaling.ca:3478' },
  { urls: 'stun:stun.doublerobotics.com:3478' },
  { urls: 'stun:stun.drogon.net:3478' },
  { urls: 'stun:stun.duocom.es:3478' },
  { urls: 'stun:stun.dus.net:3478' },
  { urls: 'stun:stun.e-fon.ch:3478' },
  { urls: 'stun:stun.easybell.de:3478' },
  { urls: 'stun:stun.easycall.pl:3478' },
  { urls: 'stun:stun.easyvoip.com:3478' },
  { urls: 'stun:stun.efficace-factory.com:3478' },
  { urls: 'stun:stun.einsundeins.com:3478' },
  { urls: 'stun:stun.einsundeins.de:3478' },
  { urls: 'stun:stun.ekiga.net:3478' },
  { urls: 'stun:stun.epygi.com:3478' },
  { urls: 'stun:stun.etoilediese.fr:3478' },
  { urls: 'stun:stun.eyeball.com:3478' },
  { urls: 'stun:stun.faktortel.com.au:3478' },
  { urls: 'stun:stun.freecall.com:3478' },
  { urls: 'stun:stun.freeswitch.org:3478' },
  { urls: 'stun:stun.freevoipdeal.com:3478' },
  { urls: 'stun:stun.fuzemeeting.com:3478' },
  { urls: 'stun:stun.gmx.de:3478' },
  { urls: 'stun:stun.gmx.net:3478' },
  { urls: 'stun:stun.gradwell.com:3478' },
  { urls: 'stun:stun.halonet.pl:3478' },
  { urls: 'stun:stun.hellonanu.com:3478' },
  { urls: 'stun:stun.hoiio.com:3478' },
  { urls: 'stun:stun.hosteurope.de:3478' },
  { urls: 'stun:stun.ideasip.com:3478' },
  { urls: 'stun:stun.imesh.com:3478' },
  { urls: 'stun:stun.infra.net:3478' },
  { urls: 'stun:stun.internetcalls.com:3478' },
  { urls: 'stun:stun.intervoip.com:3478' },
  { urls: 'stun:stun.ipcomms.net:3478' },
  { urls: 'stun:stun.ipfire.org:3478' },
  { urls: 'stun:stun.ippi.fr:3478' },
  { urls: 'stun:stun.ipshka.com:3478' },
  { urls: 'stun:stun.iptel.org:3478' },
  { urls: 'stun:stun.irian.at:3478' },
  { urls: 'stun:stun.it1.hr:3478' },
  { urls: 'stun:stun.ivao.aero:3478' },
  { urls: 'stun:stun.jappix.com:3478' },
  { urls: 'stun:stun.jumblo.com:3478' },
  { urls: 'stun:stun.justvoip.com:3478' },
  { urls: 'stun:stun.kanet.ru:3478' },
  { urls: 'stun:stun.kiwilink.co.nz:3478' },
  { urls: 'stun:stun.kundenserver.de:3478' },
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun.linea7.net:3478' },
  { urls: 'stun:stun.linphone.org:3478' },
  { urls: 'stun:stun.liveo.fr:3478' },
  { urls: 'stun:stun.lowratevoip.com:3478' },
  { urls: 'stun:stun.lugosoft.com:3478' },
  { urls: 'stun:stun.lundimatin.fr:3478' },
  { urls: 'stun:stun.magnet.ie:3478' },
  { urls: 'stun:stun.manle.com:3478' },
  { urls: 'stun:stun.mgn.ru:3478' },
  { urls: 'stun:stun.mit.de:3478' },
  { urls: 'stun:stun.mitake.com.tw:3478' },
  { urls: 'stun:stun.miwifi.com:3478' },
  { urls: 'stun:stun.modulus.gr:3478' },
  { urls: 'stun:stun.mozcom.com:3478' },
  { urls: 'stun:stun.myvoiptraffic.com:3478' },
  { urls: 'stun:stun.mywatson.it:3478' },
  { urls: 'stun:stun.nas.net:3478' },
  { urls: 'stun:stun.neotel.co.za:3478' },
  { urls: 'stun:stun.netappel.com:3478' },
  { urls: 'stun:stun.netappel.fr:3478' },
  { urls: 'stun:stun.netgsm.com.tr:3478' },
  { urls: 'stun:stun.nfon.net:3478' },
  { urls: 'stun:stun.noblogs.org:3478' },
  { urls: 'stun:stun.noc.ams-ix.net:3478' },
  { urls: 'stun:stun.node4.co.uk:3478' },
  { urls: 'stun:stun.nonoh.net:3478' },
  { urls: 'stun:stun.nottingham.ac.uk:3478' },
  { urls: 'stun:stun.nova.is:3478' },
  { urls: 'stun:stun.nventure.com:3478' },
  { urls: 'stun:stun.on.net.mk:3478' },
  { urls: 'stun:stun.ooma.com:3478' },
  { urls: 'stun:stun.ooonet.ru:3478' },
  { urls: 'stun:stun.oriontelekom.rs:3478' },
  { urls: 'stun:stun.outland-net.de:3478' },
  { urls: 'stun:stun.ozekiphone.com:3478' },
  { urls: 'stun:stun.patlive.com:3478' },
  { urls: 'stun:stun.personal-voip.de:3478' },
  { urls: 'stun:stun.petcube.com:3478' },
  { urls: 'stun:stun.phone.com:3478' },
  { urls: 'stun:stun.phoneserve.com:3478' },
  { urls: 'stun:stun.pjsip.org:3478' },
  { urls: 'stun:stun.poivy.com:3478' },
  { urls: 'stun:stun.powerpbx.org:3478' },
  { urls: 'stun:stun.powervoip.com:3478' },
  { urls: 'stun:stun.ppdi.com:3478' },
  { urls: 'stun:stun.prizee.com:3478' },
  { urls: 'stun:stun.qq.com:3478' },
  { urls: 'stun:stun.qvod.com:3478' },
  { urls: 'stun:stun.rackco.com:3478' },
  { urls: 'stun:stun.rapidnet.de:3478' },
  { urls: 'stun:stun.rb-net.com:3478' },
  { urls: 'stun:stun.refint.net:3478' },
  { urls: 'stun:stun.remote-learner.net:3478' },
  { urls: 'stun:stun.rixtelecom.se:3478' },
  { urls: 'stun:stun.rockenstein.de:3478' },
  { urls: 'stun:stun.rolmail.net:3478' }
]

const extraServers2 = [
  { urls: 'stun:stun.1und1.de:3478' },
  { urls: 'stun:stun.gmx.net:3478' },
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
  { urls: 'stun:23.21.150.121:3478' },
  { urls: 'stun:iphone-stun.strato-iphone.de:3478' },
  { urls: 'stun:numb.viagenie.ca:3478' },
  { urls: 'stun:stun.12connect.com:3478' },
  { urls: 'stun:stun.12voip.com:3478' },
  { urls: 'stun:stun.1und1.de:3478' },
  { urls: 'stun:stun.2talk.co.nz:3478' },
  { urls: 'stun:stun.2talk.com:3478' },
  { urls: 'stun:stun.3clogic.com:3478' },
  { urls: 'stun:stun.3cx.com:3478' },
  { urls: 'stun:stun.a-mm.tv:3478' },
  { urls: 'stun:stun.aa.net.uk:3478' },
  { urls: 'stun:stun.acrobits.cz:3478' },
  { urls: 'stun:stun.actionvoip.com:3478' },
  { urls: 'stun:stun.advfn.com:3478' },
  { urls: 'stun:stun.aeta-audio.com:3478' },
  { urls: 'stun:stun.aeta.com:3478' },
  { urls: 'stun:stun.altar.com.pl:3478' },
  { urls: 'stun:stun.annatel.net:3478' },
  { urls: 'stun:stun.antisip.com:3478' },
  { urls: 'stun:stun.arbuz.ru:3478' },
  { urls: 'stun:stun.avigora.fr:3478' },
  { urls: 'stun:stun.awa-shima.com:3478' },
  { urls: 'stun:stun.b2b2c.ca:3478' },
  { urls: 'stun:stun.bahnhof.net:3478' },
  { urls: 'stun:stun.barracuda.com:3478' },
  { urls: 'stun:stun.bluesip.net:3478' },
  { urls: 'stun:stun.bmwgs.cz:3478' },
  { urls: 'stun:stun.botonakis.com:3478' },
  { urls: 'stun:stun.budgetsip.com:3478' },
  { urls: 'stun:stun.cablenet-as.net:3478' },
  { urls: 'stun:stun.callromania.ro:3478' },
  { urls: 'stun:stun.callwithus.com:3478' },
  { urls: 'stun:stun.chathelp.ru:3478' },
  { urls: 'stun:stun.cheapvoip.com:3478' },
  { urls: 'stun:stun.ciktel.com:3478' },
  { urls: 'stun:stun.cloopen.com:3478' },
  { urls: 'stun:stun.comfi.com:3478' },
  { urls: 'stun:stun.commpeak.com:3478' },
  { urls: 'stun:stun.comtube.com:3478' },
  { urls: 'stun:stun.comtube.ru:3478' },
  { urls: 'stun:stun.cope.es:3478' },
  { urls: 'stun:stun.counterpath.com:3478' },
  { urls: 'stun:stun.counterpath.net:3478' },
  { urls: 'stun:stun.datamanagement.it:3478' },
  { urls: 'stun:stun.dcalling.de:3478' },
  { urls: 'stun:stun.demos.ru:3478' },
  { urls: 'stun:stun.develz.org:3478' },
  { urls: 'stun:stun.dingaling.ca:3478' },
  { urls: 'stun:stun.doublerobotics.com:3478' },
  { urls: 'stun:stun.dus.net:3478' },
  { urls: 'stun:stun.easycall.pl:3478' },
  { urls: 'stun:stun.easyvoip.com:3478' },
  { urls: 'stun:stun.ekiga.net:3478' },
  { urls: 'stun:stun.epygi.com:3478' },
  { urls: 'stun:stun.etoilediese.fr:3478' },
  { urls: 'stun:stun.faktortel.com.au:3478' },
  { urls: 'stun:stun.freecall.com:3478' },
  { urls: 'stun:stun.freeswitch.org:3478' },
  { urls: 'stun:stun.freevoipdeal.com:3478' },
  { urls: 'stun:stun.gmx.de:3478' },
  { urls: 'stun:stun.gmx.net:3478' },
  { urls: 'stun:stun.gradwell.com:3478' },
  { urls: 'stun:stun.halonet.pl:3478' },
  { urls: 'stun:stun.hellonanu.com:3478' },
  { urls: 'stun:stun.hoiio.com:3478' },
  { urls: 'stun:stun.hosteurope.de:3478' },
  { urls: 'stun:stun.ideasip.com:3478' },
  { urls: 'stun:stun.infra.net:3478' },
  { urls: 'stun:stun.internetcalls.com:3478' },
  { urls: 'stun:stun.intervoip.com:3478' },
  { urls: 'stun:stun.ipcomms.net:3478' },
  { urls: 'stun:stun.ipfire.org:3478' },
  { urls: 'stun:stun.ippi.fr:3478' },
  { urls: 'stun:stun.ipshka.com:3478' },
  { urls: 'stun:stun.irian.at:3478' },
  { urls: 'stun:stun.it1.hr:3478' },
  { urls: 'stun:stun.ivao.aero:3478' },
  { urls: 'stun:stun.jumblo.com:3478' },
  { urls: 'stun:stun.justvoip.com:3478' },
  { urls: 'stun:stun.kanet.ru:3478' },
  { urls: 'stun:stun.kiwilink.co.nz:3478' },
  { urls: 'stun:stun.linea7.net:3478' },
  { urls: 'stun:stun.linphone.org:3478' },
  { urls: 'stun:stun.liveo.fr:3478' },
  { urls: 'stun:stun.lowratevoip.com:3478' },
  { urls: 'stun:stun.lugosoft.com:3478' },
  { urls: 'stun:stun.lundimatin.fr:3478' },
  { urls: 'stun:stun.magnet.ie:3478' },
  { urls: 'stun:stun.mgn.ru:3478' },
  { urls: 'stun:stun.mit.de:3478' },
  { urls: 'stun:stun.mitake.com.tw:3478' },
  { urls: 'stun:stun.miwifi.com:3478' },
  { urls: 'stun:stun.modulus.gr:3478' },
  { urls: 'stun:stun.myvoiptraffic.com:3478' },
  { urls: 'stun:stun.mywatson.it:3478' },
  { urls: 'stun:stun.nas.net:3478' },
  { urls: 'stun:stun.neotel.co.za:3478' },
  { urls: 'stun:stun.netappel.com:3478' },
  { urls: 'stun:stun.netgsm.com.tr:3478' },
  { urls: 'stun:stun.nfon.net:3478' },
  { urls: 'stun:stun.noblogs.org:3478' },
  { urls: 'stun:stun.noc.ams-ix.net:3478' },
  { urls: 'stun:stun.nonoh.net:3478' },
  { urls: 'stun:stun.nottingham.ac.uk:3478' },
  { urls: 'stun:stun.nova.is:3478' },
  { urls: 'stun:stun.on.net.mk:3478' },
  { urls: 'stun:stun.ooma.com:3478' },
  { urls: 'stun:stun.ooonet.ru:3478' },
  { urls: 'stun:stun.oriontelekom.rs:3478' },
  { urls: 'stun:stun.outland-net.de:3478' },
  { urls: 'stun:stun.ozekiphone.com:3478' },
  { urls: 'stun:stun.personal-voip.de:3478' },
  { urls: 'stun:stun.phone.com:3478' },
  { urls: 'stun:stun.pjsip.org:3478' },
  { urls: 'stun:stun.poivy.com:3478' },
  { urls: 'stun:stun.powerpbx.org:3478' },
  { urls: 'stun:stun.powervoip.com:3478' },
  { urls: 'stun:stun.ppdi.com:3478' },
  { urls: 'stun:stun.qq.com:3478' },
  { urls: 'stun:stun.rackco.com:3478' },
  { urls: 'stun:stun.rapidnet.de:3478' },
  { urls: 'stun:stun.rb-net.com:3478' },
  { urls: 'stun:stun.rixtelecom.se:3478' },
  { urls: 'stun:stun.rockenstein.de:3478' },
  { urls: 'stun:stun.rolmail.net:3478' },
  { urls: 'stun:stun.rynga.com:3478' },
  { urls: 'stun:stun.schlund.de:3478' },
  { urls: 'stun:stun.services.mozilla.com:3478' },
  { urls: 'stun:stun.sigmavoip.com:3478' },
  { urls: 'stun:stun.sip.us:3478' },
  { urls: 'stun:stun.sipdiscount.com:3478' },
  { urls: 'stun:stun.sipgate.net:10000' },
  { urls: 'stun:stun.sipgate.net:3478' },
  { urls: 'stun:stun.siplogin.de:3478' },
  { urls: 'stun:stun.sipnet.net:3478' },
  { urls: 'stun:stun.sipnet.ru:3478' },
  { urls: 'stun:stun.siportal.it:3478' },
  { urls: 'stun:stun.sippeer.dk:3478' },
  { urls: 'stun:stun.siptraffic.com:3478' },
  { urls: 'stun:stun.skylink.ru:3478' },
  { urls: 'stun:stun.sma.de:3478' },
  { urls: 'stun:stun.smartvoip.com:3478' },
  { urls: 'stun:stun.smsdiscount.com:3478' },
  { urls: 'stun:stun.snafu.de:3478' },
  { urls: 'stun:stun.softjoys.com:3478' },
  { urls: 'stun:stun.solcon.nl:3478' },
  { urls: 'stun:stun.solnet.ch:3478' },
  { urls: 'stun:stun.sonetel.com:3478' },
  { urls: 'stun:stun.sonetel.net:3478' },
  { urls: 'stun:stun.sovtest.ru:3478' },
  { urls: 'stun:stun.speedy.com.ar:3478' },
  { urls: 'stun:stun.spokn.com:3478' },
  { urls: 'stun:stun.srce.hr:3478' },
  { urls: 'stun:stun.ssl7.net:3478' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'stun:stun.symform.com:3478' },
  { urls: 'stun:stun.symplicity.com:3478' },
  { urls: 'stun:stun.t-online.de:3478' },
  { urls: 'stun:stun.tagan.ru:3478' },
  { urls: 'stun:stun.teachercreated.com:3478' },
  { urls: 'stun:stun.tel.lu:3478' },
  { urls: 'stun:stun.telbo.com:3478' },
  { urls: 'stun:stun.telefacil.com:3478' },
  { urls: 'stun:stun.tng.de:3478' },
  { urls: 'stun:stun.twt.it:3478' },
  { urls: 'stun:stun.u-blox.com:3478' },
  { urls: 'stun:stun.ucsb.edu:3478' },
  { urls: 'stun:stun.ucw.cz:3478' },
]

const stunServers = [
  { "urls": "stun:iphone-stun.strato-iphone.de:3478" },
  { "urls": "stun:numb.viagenie.ca:3478" },
  { "urls": "stun:stun.12connect.com:3478" },
  { "urls": "stun:stun.12voip.com:3478" },
  { "urls": "stun:stun.1und1.de:3478" },
  { "urls": "stun:stun.3cx.com:3478" },
  { "urls": "stun:stun.acrobits.cz:3478" },
  { "urls": "stun:stun.actionvoip.com:3478" },
  { "urls": "stun:stun.advfn.com:3478" },
  { "urls": "stun:stun.altar.com.pl:3478" },
  { "urls": "stun:stun.antisip.com:3478" },
  { "urls": "stun:stun.avigora.fr:3478" },
  { "urls": "stun:stun.bluesip.net:3478" },
  { "urls": "stun:stun.cablenet-as.net:3478" },
  { "urls": "stun:stun.callromania.ro:3478" },
  { "urls": "stun:stun.callwithus.com:3478" },
  { "urls": "stun:stun.cheapvoip.com:3478" },
  { "urls": "stun:stun.cloopen.com:3478" },
  { "urls": "stun:stun.commpeak.com:3478" },
  { "urls": "stun:stun.cope.es:3478" },
  { "urls": "stun:stun.counterpath.com:3478" },
  { "urls": "stun:stun.counterpath.net:3478" },
  { "urls": "stun:stun.dcalling.de:3478" },
  { "urls": "stun:stun.demos.ru:3478" },
  { "urls": "stun:stun.dus.net:3478" },
  { "urls": "stun:stun.easycall.pl:3478" },
  { "urls": "stun:stun.easyvoip.com:3478" },
  { "urls": "stun:stun.ekiga.net:3478" },
  { "urls": "stun:stun.epygi.com:3478" },
  { "urls": "stun:stun.etoilediese.fr:3478" },
  { "urls": "stun:stun.faktortel.com.au:3478" },
  { "urls": "stun:stun.freecall.com:3478" },
  { "urls": "stun:stun.freeswitch.org:3478" },
  { "urls": "stun:stun.freevoipdeal.com:3478" },
  { "urls": "stun:stun.gmx.de:3478" },
  { "urls": "stun:stun.gmx.net:3478" },
  { "urls": "stun:stun.halonet.pl:3478" },
  { "urls": "stun:stun.hoiio.com:3478" },
  { "urls": "stun:stun.hosteurope.de:3478" },
  { "urls": "stun:stun.infra.net:3478" },
  { "urls": "stun:stun.internetcalls.com:3478" },
  { "urls": "stun:stun.intervoip.com:3478" },
  { "urls": "stun:stun.ipfire.org:3478" },
  { "urls": "stun:stun.ippi.fr:3478" },
  { "urls": "stun:stun.ipshka.com:3478" },
  { "urls": "stun:stun.it1.hr:3478" },
  { "urls": "stun:stun.ivao.aero:3478" },
  { "urls": "stun:stun.jumblo.com:3478" },
  { "urls": "stun:stun.justvoip.com:3478" },
  { "urls": "stun:stun.l.google.com:19302" },
  { "urls": "stun:stun.linphone.org:3478" },
  { "urls": "stun:stun.liveo.fr:3478" },
  { "urls": "stun:stun.lowratevoip.com:3478" },
  { "urls": "stun:stun.lundimatin.fr:3478" },
  { "urls": "stun:stun.mit.de:3478" },
  { "urls": "stun:stun.miwifi.com:3478" },
  { "urls": "stun:stun.modulus.gr:3478" },
  { "urls": "stun:stun.myvoiptraffic.com:3478" },
  { "urls": "stun:stun.netappel.com:3478" },
  { "urls": "stun:stun.netgsm.com.tr:3478" },
  { "urls": "stun:stun.nfon.net:3478" },
  { "urls": "stun:stun.nonoh.net:3478" },
  { "urls": "stun:stun.nottingham.ac.uk:3478" },
  { "urls": "stun:stun.ooma.com:3478" },
  { "urls": "stun:stun.ozekiphone.com:3478" },
  { "urls": "stun:stun.pjsip.org:3478" },
  { "urls": "stun:stun.poivy.com:3478" },
  { "urls": "stun:stun.powervoip.com:3478" },
  { "urls": "stun:stun.ppdi.com:3478" },
  { "urls": "stun:stun.qq.com:3478" },
  { "urls": "stun:stun.rackco.com:3478" },
  { "urls": "stun:stun.rockenstein.de:3478" },
  { "urls": "stun:stun.rolmail.net:3478" },
  { "urls": "stun:stun.rynga.com:3478" },
  { "urls": "stun:stun.schlund.de:3478" },
  { "urls": "stun:stun.sigmavoip.com:3478" },
  { "urls": "stun:stun.sip.us:3478" },
  { "urls": "stun:stun.sipdiscount.com:3478" },
  { "urls": "stun:stun.sipgate.net:10000" },
  { "urls": "stun:stun.sipgate.net:3478" },
  { "urls": "stun:stun.siplogin.de:3478" },
  { "urls": "stun:stun.sipnet.net:3478" },
  { "urls": "stun:stun.sipnet.ru:3478" },
  { "urls": "stun:stun.sippeer.dk:3478" },
  { "urls": "stun:stun.siptraffic.com:3478" },
  { "urls": "stun:stun.sma.de:3478" },
  { "urls": "stun:stun.smartvoip.com:3478" },
  { "urls": "stun:stun.smsdiscount.com:3478" },
  { "urls": "stun:stun.solcon.nl:3478" },
  { "urls": "stun:stun.solnet.ch:3478" },
  { "urls": "stun:stun.sonetel.com:3478" },
  { "urls": "stun:stun.sonetel.net:3478" },
  { "urls": "stun:stun.sovtest.ru:3478" },
  { "urls": "stun:stun.srce.hr:3478" },
  { "urls": "stun:stun.stunprotocol.org:3478" },
  { "urls": "stun:stun.t-online.de:3478" },
  { "urls": "stun:stun.tel.lu:3478" },
  { "urls": "stun:stun.telbo.com:3478" },
  { "urls": "stun:stun.tng.de:3478" },
  { "urls": "stun:stun.twt.it:3478" },
  { "urls": "stun:stun.uls.co.za:3478" },
  { "urls": "stun:stun.unseen.is:3478" },
  { "urls": "stun:stun.usfamily.net:3478" },
  { "urls": "stun:stun.veoh.com:3478" },
  { "urls": "stun:stun.vidyo.com:3478" },
  { "urls": "stun:stun.viva.gr:3478" },
  { "urls": "stun:stun.vivox.com:3478" },
  { "urls": "stun:stun.vline.com:3478" },
  { "urls": "stun:stun.voip.aebc.com:3478" },
  { "urls": "stun:stun.voipblast.com:3478" },
  { "urls": "stun:stun.voipbuster.com:3478" },
  { "urls": "stun:stun.voipbusterpro.com:3478" },
  { "urls": "stun:stun.voipcheap.co.uk:3478" },
  { "urls": "stun:stun.voipcheap.com:3478" },
  { "urls": "stun:stun.voipfibre.com:3478" },
  { "urls": "stun:stun.voipgain.com:3478" },
  { "urls": "stun:stun.voipgate.com:3478" },
  { "urls": "stun:stun.voipinfocenter.com:3478" },
  { "urls": "stun:stun.voipplanet.nl:3478" },
  { "urls": "stun:stun.voippro.com:3478" },
  { "urls": "stun:stun.voipraider.com:3478" },
  { "urls": "stun:stun.voipstunt.com:3478" },
  { "urls": "stun:stun.voipwise.com:3478" },
  { "urls": "stun:stun.voipzoom.com:3478" },
  { "urls": "stun:stun.vopium.com:3478" },
  { "urls": "stun:stun.voys.nl:3478" },
  { "urls": "stun:stun.voztele.com:3478" },
  { "urls": "stun:stun.webcalldirect.com:3478" },
  { "urls": "stun:stun.wifirst.net:3478" },
  { "urls": "stun:stun.xtratelecom.es:3478" },
  { "urls": "stun:stun.zadarma.com:3478" },
  { "urls": "stun:stun1.faktortel.com.au:3478" },
  { "urls": "stun:stun1.l.google.com:19302" },
  { "urls": "stun:stun1.voiceeclipse.net:3478" },
  { "urls": "stun:stun2.l.google.com:19302" },
  { "urls": "stun:stun3.l.google.com:19302" },
  { "urls": "stun:stun4.l.google.com:19302" }
];
const output = [...new Set([...stunServers, ...extraServers2, ...additionalStuns])]

export const pcConfig = {
  iceServers: output,
  iceCandidatePoolSize: 20
};


export const powerStarImgs = [
  "https://e0.pxfuel.com/wallpapers/232/433/desktop-wallpaper-power-star-pawan-kalyan-pawankalyan.jpg",
  "https://funmauj.b-cdn.net/test/413011.jpg",
  "https://i.pinimg.com/564x/4f/ae/b3/4faeb3a538b79b16c699406e5ef7922f.jpg",
  "https://funmauj.b-cdn.net/test/351267.jpg",
  "https://i.pinimg.com/564x/e6/5e/cb/e65ecb12b33ae2cb57c3c819ccabd0e7.jpg",
  "https://i.pinimg.com/564x/c5/6c/92/c56c92f6dd761932196c74fd09891d9b.jpg"
]

export const recieveColors: ReceiveColors = {
  red: "text-red-500",
  green: "text-purple-500",
  yellow: "text-yellow-600",
  pink: "text-pink-600",
  blue: "text-blue-500"
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const convertBlobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // This will include the 'data:[content/type];base64,' prefix
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob); // Convert the Blob to a Data URL
  });
};

export const convertBase64ToBlob = (base64Data: string, contentType: { type: string }) => {
  const base64String = base64Data.split(',')[1]; // Remove 'data:[content/type];base64,' prefix
  const byteString = atob(base64String);
  const byteArrays = [];

  for (let i = 0; i < byteString.length; i++) {
    byteArrays.push(byteString.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], contentType);
};
