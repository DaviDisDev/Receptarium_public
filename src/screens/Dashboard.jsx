import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Política de privacidad</Text>
            <Text style={styles.subtitle}>Última actualización: 11 de febrero de 2024</Text>
            <Text style={styles.paragraph}>Esta Política de privacidad describe nuestras políticas y procedimientos sobre la recopilación, uso y divulgación de su información cuando utiliza el Servicio y le informa sobre sus derechos de privacidad y cómo la ley lo protege a usted.</Text>
            <Text style={styles.paragraph}>Utilizamos sus datos personales para proporcionar y mejorar el Servicio. Al utilizar el Servicio, acepta la recopilación y el uso de la información de acuerdo con esta Política de privacidad.</Text>

            <Text style={styles.subtitle}>Interpretación y definiciones</Text>
            <Text style={styles.subtitle}>Interpretación</Text>
            <Text style={styles.paragraph}>Las palabras cuya inicial está en mayúscula tienen significados definidos en las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de si aparecen en singular o en plural.</Text>

            <Text style={styles.subtitle}>Definiciones</Text>
            <Text style={styles.paragraph}>A los efectos de esta Política de privacidad:</Text>


            <Text style={styles.definition}><Text style={styles.bold}>Cuenta:</Text> significa una cuenta única creada para que usted acceda a nuestro Servicio o partes de nuestro Servicio.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Afiliado:</Text> significa una entidad que controla, es controlada por o está bajo el control común de una parte, donde "control" significa la propiedad del 50% o más de las acciones, intereses patrimoniales u otros valores con derecho a voto para la elección de directores u otra autoridad de gestión.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Aplicación:</Text> se refiere a Receptarium, el programa de software proporcionado por la Empresa.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Empresa:</Text> (referida como "la Empresa", "Nosotros", "Nuestro" o "Nuestro" en este Acuerdo) se refiere a Receptarium.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>País:</Text> se refiere a: España</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Dispositivo:</Text> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Datos personales:</Text> es cualquier información que se relaciona con un individuo identificado o identificable.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Servicio:</Text> se refiere a la Aplicación.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Proveedor de servicios:</Text> significa cualquier persona natural o jurídica que procesa los datos en nombre de la Empresa. Se refiere a empresas o personas físicas contratadas por la Empresa para facilitar el Servicio, para proporcionar el Servicio en nombre de la Empresa, para realizar servicios relacionados con el Servicio o para ayudar a la Empresa en el análisis de cómo se utiliza el Servicio.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Datos de uso:</Text> se refiere a datos recopilados automáticamente, ya sea generados por el uso del Servicio o desde la propia infraestructura del Servicio (por ejemplo, la duración de una visita a la página).</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Usted:</Text> significa el individuo que accede o utiliza el Servicio, o la empresa u otra entidad jurídica en nombre de la cual dicho individuo accede o utiliza el Servicio, según corresponda.</Text>

            <Text style={styles.title}>Recopilación y uso de sus datos personales</Text>
            <Text style={styles.subtitle}>Tipos de datos recopilados</Text>
            <Text style={styles.subtitle}>Datos personales</Text>
            <Text style={styles.paragraph}>Mientras utiliza nuestro Servicio, podemos pedirle que nos proporcione cierta información personalmente identificable que se puede utilizar para contactarlo o identificarlo. La información personalmente identificable puede incluir, entre otros:</Text>
            <Text style={styles.definition}>- Dirección de correo electrónico</Text>
            <Text style={styles.definition}>- Nombre y apellido</Text>
            <Text style={styles.definition}>- Datos de uso</Text>
            <Text style={styles.subtitle}>Datos de uso</Text>
            <Text style={styles.paragraph}>Los datos de uso se recopilan automáticamente al utilizar el Servicio.</Text>
            <Text style={styles.paragraph}>Los datos de uso pueden incluir información como la dirección de Protocolo de Internet de su dispositivo (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita, el tiempo que pasa en esas páginas, identificadores de dispositivos únicos y otros datos de diagnóstico.</Text>
            <Text style={styles.paragraph}>Cuando accede al Servicio mediante un dispositivo móvil, podemos recopilar cierta información automáticamente, incluida, entre otra, la identificación única del dispositivo móvil, la dirección IP de su dispositivo móvil, el sistema operativo de su dispositivo móvil, el tipo de navegador de Internet móvil que utiliza, identificadores de dispositivos únicos y otros datos de diagnóstico.</Text>
            <Text style={styles.paragraph}>También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio mediante un dispositivo móvil.</Text>
            <Text style={styles.subtitle}>Información recopilada mientras utiliza la Aplicación</Text>
            <Text style={styles.paragraph}>Mientras utiliza Nuestra Aplicación, con el fin de proporcionar características de Nuestra Aplicación, podemos recopilar, con su permiso previo:</Text>
            <Text style={[styles.bold, styles.definition]}>- Fotografías y otra información de la cámara y la biblioteca de fotos de su dispositivo</Text>
            <Text style={styles.paragraph}>Utilizamos esta información para proporcionar características de nuestro Servicio, para mejorar y personalizar nuestro Servicio. La información puede ser cargada en los servidores de la Empresa y/o en el servidor de un Proveedor de servicios o simplemente puede ser almacenada en su dispositivo.</Text>
            <Text style={styles.paragraph}>Puede habilitar o deshabilitar el acceso a esta información en cualquier momento a través de la configuración de su dispositivo.</Text>
            <Text style={styles.subtitle}>Uso de sus datos personales</Text>
            <Text style={styles.paragraph}>La Empresa puede utilizar Datos personales para los siguientes fines:</Text>
            <Text style={[styles.bold, styles.definition]}>- Para proporcionar y mantener nuestro Servicio, incluido para supervisar el uso de nuestro Servicio.</Text>
            <Text style={styles.definition}> <Text style={styles.bold}>- Para gestionar su cuenta:</Text> para gestionar su registro como usuario del Servicio. Los Datos personales que proporciona pueden darle acceso a diferentes funcionalidades del Servicio que están disponibles para usted como usuario registrado.</Text>

            <Text style={styles.paragraph}><Text style={styles.bold}>-Para el rendimiento de un contrato:</Text> el desarrollo, cumplimiento y realización del contrato de compra de los productos, artículos o servicios que ha adquirido o de cualquier otro contrato con nosotros a través del Servicio.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Para contactarlo:</Text> Para contactarlo por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones push de aplicaciones móviles sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios contratados, incluidas las actualizaciones de seguridad, cuando sea necesario o razonable para su implementación.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Para proporcionarle noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos y que son similares a los que ya ha adquirido o consultado, a menos que haya optado por no recibir tal información.</Text></Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Para gestionar sus solicitudes:</Text> Para atender y gestionar sus solicitudes hacia nosotros.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Para transferencias comerciales:</Text> Podemos usar su información para evaluar o llevar a cabo una fusión, venta de activos, reestructuración, reorganización, disolución u otra venta o transferencia de la totalidad o parte de nuestros activos, ya sea como empresa en funcionamiento o como parte de una quiebra, liquidación o procedimiento similar, en el que los Datos personales en poder de nosotros sobre los usuarios de nuestro Servicio sean uno de los activos transferidos.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Para otros fines:</Text> Podemos utilizar su información para otros fines, como análisis de datos, identificación de tendencias de uso, determinación de la efectividad de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y su experiencia.</Text>
            <Text style={styles.paragraph}>Podemos compartir su información personal en las siguientes situaciones:</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Con Proveedores de servicios:</Text> Podemos compartir su información personal con Proveedores de servicios para supervisar y analizar el uso de nuestro Servicio, para contactarlo.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Con Afiliados:</Text> Podemos compartir su información con nuestras filiales, en cuyo caso les exigiremos a esas filiales que respeten esta Política de privacidad. Las afiliadas incluyen nuestra empresa matriz y cualquier otra subsidiaria, socios de empresas conjuntas u otras empresas que controlamos o que están bajo un control común con nosotros.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Con socios comerciales:</Text> Podemos compartir su información con nuestros socios comerciales para ofrecerle ciertos productos, servicios o promociones.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>-Con otros usuarios:</Text> cuando comparta información personal u interactúe en las áreas públicas con otros usuarios, dicha información puede ser vista por todos los usuarios y puede ser distribuida públicamente fuera.</Text>
            <Text style={styles.definition}><Text style={styles.bold}>Con su consentimiento:</Text> Podemos divulgar su información personal para cualquier otro propósito con su consentimiento.</Text>
            <Text style={styles.subtitle}>Retención de sus datos personales</Text>
            <Text style={styles.paragraph}>La Empresa retendrá sus Datos personales solo durante el tiempo que sea necesario para los fines establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus Datos personales en la medida necesaria para cumplir con nuestras obligaciones legales (por ejemplo, si estamos obligados a conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos legales y políticas.</Text>
            <Text style={styles.paragraph}>La Empresa también retendrá Datos de uso con fines de análisis interno. Los Datos de uso se retienen generalmente por un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de nuestro Servicio, o estamos legalmente obligados a retener estos datos por períodos de tiempo más largos.</Text>

            <Text style={styles.subtitle}>Transferencia de sus datos personales</Text>
            <Text style={styles.paragraph}>Su información, incluidos los Datos personales, se procesa en las oficinas operativas de la Empresa y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Esto significa que esta información puede ser transferida a — y mantenida en — computadoras ubicadas fuera de su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de su jurisdicción.</Text>
            <Text style={styles.paragraph}>Su consentimiento a esta Política de privacidad seguido de su envío de dicha información representa su acuerdo con esa transferencia.</Text>
            <Text style={styles.paragraph}>La Empresa tomará todas las medidas razonablemente necesarias para garantizar que sus datos sean tratados de manera segura y de acuerdo con esta Política de privacidad y no se realizará ninguna transferencia de sus Datos personales a una organización o país a menos que haya controles adecuados en su lugar, incluida la seguridad de sus datos y otra información personal.</Text>

            <Text style={styles.subtitle}>Eliminar sus datos personales</Text>
            <Text style={styles.paragraph}>Tiene derecho a eliminar o solicitar que ayudemos a eliminar los Datos personales que hemos recopilado sobre usted.</Text>
            <Text style={styles.paragraph}>Nuestro Servicio puede darle la capacidad de eliminar cierta información sobre usted desde dentro del Servicio.</Text>
            <Text style={styles.paragraph}>Puede actualizar, modificar o eliminar su información en cualquier momento iniciando sesión en su Cuenta, si tiene una, y visitando la sección de configuración de la cuenta que le permite administrar su información personal. También puede contactarnos para solicitar acceso, corrección o eliminación de cualquier información personal que nos haya proporcionado.</Text>
            <Text style={styles.paragraph}>Tenga en cuenta, sin embargo, que es posible que necesitemos conservar cierta información cuando tengamos una obligación legal o base legal para hacerlo.</Text>

            <Text style={styles.subtitle}>Divulgación de sus datos personales</Text>
            <Text style={styles.subtitle}>Transacciones comerciales</Text>
            <Text style={styles.paragraph}>Si la Empresa está involucrada en una fusión, adquisición o venta de activos, sus Datos personales pueden ser transferidos. Proporcionaremos aviso antes de que sus Datos personales sean transferidos y estén sujetos a una Política de privacidad diferente.</Text>
            <Text style={styles.subtitle}>Aplicación de la ley</Text>
            <Text style={styles.paragraph}>En ciertas circunstancias, la Empresa puede estar obligada a divulgar sus Datos personales si así lo requiere la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</Text>
            <Text style={styles.subtitle}>Otros requisitos legales</Text>
            <Text style={styles.paragraph}>La Empresa puede divulgar sus Datos personales de buena fe cuando considere que dicha acción es necesaria para:</Text>
            <Text style={styles.listItem}>- Cumplir con una obligación legal</Text>
            <Text style={styles.listItem}>- Proteger y defender los derechos o propiedades de la Empresa</Text>
            <Text style={styles.listItem}>- Prevenir o investigar posibles irregularidades en relación con el Servicio</Text>
            <Text style={styles.listItem}>- Proteger la seguridad personal de los usuarios del Servicio o del público</Text>
            <Text style={styles.listItem}>- Protegerse contra la responsabilidad legal</Text>

            <Text style={styles.subtitle}>Seguridad de sus datos personales</Text>
            <Text style={styles.paragraph}>La seguridad de sus Datos personales es importante para nosotros, pero recuerde que ningún método de transmisión a través de Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus Datos personales, no podemos garantizar su seguridad absoluta.</Text>

            <Text style={styles.subtitle}>Privacidad de los niños</Text>
            <Text style={styles.paragraph}>Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos a sabiendas información personalmente identificable de personas menores de 13 años. Si usted es padre, madre o tutor y sabe que su hijo nos ha proporcionado Datos personales, comuníquese con nosotros. Si nos enteramos de que hemos recopilado Datos personales de menores de 13 años sin verificación del consentimiento parental, tomamos medidas para eliminar esa información de nuestros servidores.</Text>
            <Text style={styles.paragraph}>Si necesitamos confiar en el consentimiento como base legal para procesar su información y su país requiere el consentimiento de un padre, es posible que necesitemos el consentimiento de su padre antes de recopilar y usar esa información.</Text>

            <Text style={styles.subtitle}>Enlaces a otros sitios web</Text>
            <Text style={styles.paragraph}>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por nosotros. Si hace clic en un enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de privacidad de cada sitio que visite.</Text>
            <Text style={styles.paragraph}>No tenemos control sobre y no asumimos responsabilidad alguna por el contenido, las políticas de privacidad o las prácticas de sitios o servicios de terceros.</Text>

            <Text style={styles.subtitle}>Cambios en esta Política de privacidad</Text>
            <Text style={styles.paragraph}>Podemos actualizar nuestra Política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de privacidad en esta página.</Text>
            <Text style={styles.paragraph}>Le informaremos por correo electrónico y/o mediante un aviso destacado sobre nuestro Servicio, antes de que el cambio entre en vigencia y actualizaremos la "Última actualización" en la parte superior de esta Política de privacidad.</Text>
            <Text style={styles.paragraph}>Se le aconseja que revise esta Política de privacidad periódicamente para cualquier cambio. Los cambios a esta Política de privacidad son efectivos cuando se publican en esta página.</Text>
            <Text style={styles.subtitle}>Contáctenos</Text>
            <Text style={styles.paragraph}>Si tiene alguna pregunta sobre esta Política de privacidad, puede contactarnos:</Text>
            <Text style={styles.fin}>Por correo electrónico: contacto@david-pr.com</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f582ae32',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    paragraph: {
        marginBottom: 20
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    definition: {
        marginBottom: 15,
        lineHeight: 20
    },
    bold: {
        fontWeight: 'bold'
    },
    fin: {
        marginBottom: 20
    }
});

export default Dashboard;
